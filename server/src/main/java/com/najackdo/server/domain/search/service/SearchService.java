package com.najackdo.server.domain.search.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.search.dto.AutocompleteResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SearchService {

	private final RedisTemplate<String, String> redisTemplate;

	private final BookRepository bookRepository;

	private static final int MAXIMUM_SAVED_VALUE = 5;
	private static final String SEARCH_KEY = "search:";
	private static final String SEARCH_COUNT_KEY = "search_count:";
	private static final String POPULAR_KEYWORDS_KEY = "popular_keywords";

	private static final long AUTO_COMPLETE_LIMIT = 10L; // 예: 최대 10개의 자동완성 결과 반환
	private static final String SUFFIX = "*"; // 예: 자동완성 접미사
	private static final String AUTO_COMPLETE_KEY = "autocomplete"; // 예: Redis에서 사용할 키 값
	private static final String SCORE_KEY = "score";

	public Page<BookData.Search> searchKeyword(Long userId, String keyword, Pageable pageable) {

		// 검색어 유효성 검사
		if (isInvalidKeyword(keyword))
			return null;

		addAutocomplete(keyword);

		String key = SEARCH_KEY + userId;

		List<Book> userInterestingBooks = bookRepository.findInterestingBooks(userId);

		Page<BookData.Search> searchBooks = bookRepository.findByTitleContains(keyword, pageable)
			.map(book -> BookData.Search.of(book, userInterestingBooks));  // of 메서드를 사용하여 관심 여부 반영

		// 검색 결과가 있으면 Redis에 검색어 저장 및 관련 통계 업데이트
		if (!searchBooks.isEmpty()) {
			addKeywordInRedis(keyword, key);
			incrementSearchCount(keyword);
			updatePopularKeywordsList(keyword);
		}

		return searchBooks;
	}

	@Transactional(readOnly = true)
	public List<String> getResentSearchList(Long memberId) {

		String key = SEARCH_KEY + memberId;

		ListOperations<String, String> listOperations = redisTemplate.opsForList();

		List<String> range = listOperations.range(key, 0, listOperations.size(key));
		Collections.reverse(range);

		return range;
	}

	@Transactional(readOnly = true)
	public List<String> getPopularKeywords() {
		Map<String, Long> keywordCounts = getKeywordCounts();

		List<String> popularKeywords = getTopFivePopularKeywords(keywordCounts);

		return popularKeywords;
	}

	private boolean isInvalidKeyword(String keyword) {
		return keyword == null || keyword.isBlank() || keyword.isEmpty();
	}

	private void addKeywordInRedis(String keyword, String key) {
		// Redis List에 최근 검색어 추가
		ListOperations<String, String> listOperations = redisTemplate.opsForList();
		boolean isKeywordInRedis = false;

		for (String pastKeyword : listOperations.range(key, 0, listOperations.size(key))) {
			if (pastKeyword.equals(keyword)) {
				isKeywordInRedis = true;
				break;
			}
		}

		// 중복된 키워드가 있으면 해당 키워드를 리스트의 맨 앞으로 이동
		if (isKeywordInRedis) {
			listOperations.remove(key, 1, keyword); // 기존 키워드 제거
			listOperations.rightPush(key, keyword); // 키워드를 맨 앞에 추가
		}

		// 중복된 검색어가 없으면 추가하고, 최대 저장 개수를 초과하면 가장 오래된 항목 제거
		else {
			if (listOperations.size(key) == MAXIMUM_SAVED_VALUE) {
				listOperations.leftPop(key);
			}
			listOperations.rightPush(key, keyword);
		}
	}

	private void incrementSearchCount(String keyword) {
		// Redis에서 해당 검색어의 검색 횟수 증가
		String countKey = SEARCH_COUNT_KEY + keyword;

		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

		valueOperations.increment(countKey);
	}

	private Map<String, Long> getKeywordCounts() {
		// 인기 검색어 목록 업데이트
		Map<String, Long> keywordCounts = new HashMap<>();
		Set<String> keys = redisTemplate.keys(SEARCH_COUNT_KEY + "*");

		for (String key : keys) {
			String keyword = key.replace(SEARCH_COUNT_KEY, "");
			long count = Long.parseLong(redisTemplate.opsForValue().get(key));

			keywordCounts.put(keyword, count);
		}

		return keywordCounts;
	}

	private List<String> getTopFivePopularKeywords(Map<String, Long> keywordCounts) {
		List<String> popularKeywords = keywordCounts.entrySet()
			.stream()
			.sorted(Map.Entry.<String, Long>comparingByValue().reversed())
			.limit(MAXIMUM_SAVED_VALUE)
			.map(Map.Entry::getKey)
			.toList();

		return popularKeywords;
	}

	private void updatePopularKeywordsList(String keyword) {
		Long currentCount = redisTemplate.opsForList().size(POPULAR_KEYWORDS_KEY);

		if (currentCount >= MAXIMUM_SAVED_VALUE) {
			redisTemplate.opsForList().trim(POPULAR_KEYWORDS_KEY, 0, MAXIMUM_SAVED_VALUE - 1);
		}

		ListOperations<String, String> listOperations = redisTemplate.opsForList();
		listOperations.rightPush(POPULAR_KEYWORDS_KEY, keyword);
	}

	public AutocompleteResponse getAutocomplete(String searchWord) {
		List<String> autocompleteList = getAutoCompleteListFromRedis(searchWord);
		return sortAutocompleteListByScore(autocompleteList);
	}

	public void addAutocomplete(String searchWord) {
		ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
		zSetOperations.incrementScore(SCORE_KEY, searchWord, 1.0);

		if (zSetOperations.score(AUTO_COMPLETE_KEY, searchWord) == null) {
			for (int i = 1; i <= searchWord.length(); i++) {
				zSetOperations.add(AUTO_COMPLETE_KEY, searchWord.substring(0, i), 0.0);
			}
			zSetOperations.add(AUTO_COMPLETE_KEY, searchWord + SUFFIX, 0.0);
		}
	}

	public List<String> getAutoCompleteListFromRedis(String searchWord) {
		ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
		List<String> autocompleteList = List.of();

		Long rank = zSetOperations.rank(AUTO_COMPLETE_KEY, searchWord);
		if (rank != null) {
			Set<String> rangeList = zSetOperations.range(AUTO_COMPLETE_KEY, rank, rank + 1000);
			if (rangeList != null) {
				autocompleteList = rangeList.stream()
					.filter(value -> value.endsWith(SUFFIX) && value.startsWith(searchWord))
					.map(value -> value.endsWith(SUFFIX) ? value.substring(0, value.length() - SUFFIX.length()) : value)
					.limit(AUTO_COMPLETE_LIMIT)
					.toList();
			}
		}
		return autocompleteList;
	}

	public AutocompleteResponse sortAutocompleteListByScore(List<String> autocompleteList) {
		ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
		List<AutocompleteResponse.Data> list = new ArrayList<>();

		for (String word : autocompleteList) {
			Double score = zSetOperations.score(SCORE_KEY, word);

			if (score != null) {
				list.add(new AutocompleteResponse.Data(word, score));
			}
		}
		list.sort((a, b) -> Double.compare(b.getScore(), a.getScore()));

		return new AutocompleteResponse(list);
	}

	public void deleteRecentKeyword(Long id, String keyword) {
		String key = SEARCH_KEY + id;
		ListOperations<String, String> listOperations = redisTemplate.opsForList();
		listOperations.remove(key, 1, keyword);
	}
}
