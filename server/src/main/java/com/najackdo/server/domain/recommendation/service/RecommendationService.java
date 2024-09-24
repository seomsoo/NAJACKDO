package com.najackdo.server.domain.recommendation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.recommendation.dto.RecommendationResponse;

@Service
public class RecommendationService {

	private final String BASE_URL = "http://localhost:8000/item/recomm/";

	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private BookRepository bookRepository;

	public List<BookData.Search> getBookBasedReccom(Long bookId) {

		List<Integer> bookIds = restTemplate.getForObject(BASE_URL + bookId, RecommendationResponse.class).getBookIds();

		return  bookRepository.findByIds(bookIds).stream().map(BookData.Search::of).filter(book -> book.getBookId() != bookId).toList();
	}
}
