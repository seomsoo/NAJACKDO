package com.najackdo.server.domain.searh.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.searh.service.SearchService;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

	private final SearchService searchService;

	@PostMapping
	public SuccessResponse<List<String>> search(@CurrentUser User user,  @RequestParam("keyword") String keyword) {
		return SuccessResponse.of(searchService.searchKeyword(user.getId(), keyword));
	}

	@GetMapping
	public SuccessResponse<List<String>> getRecentSearchList(@CurrentUser User user) {

		// 최근 검색어 조회 서비스 호출
		return SuccessResponse.of(searchService.getResentSearchList(user.getId()));
	}

	@GetMapping("/popularity")
	public SuccessResponse<List<String>> getPopularSearchList() {

		// 인기 검색어 조회 서비스 호출
		return SuccessResponse.of(searchService.getPopularKeywords());
	}
}