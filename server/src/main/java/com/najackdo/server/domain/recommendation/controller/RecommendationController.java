package com.najackdo.server.domain.recommendation.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.recommendation.service.RecommendationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/recommend")
@Tag(name = "책 추천")
public class RecommendationController {

	private final RecommendationService recommendationService;

	@GetMapping("/{bookId}")
	@Operation(summary = "책을 기반으로 비슷한 책 추천", description = "빈리스트 반환 시 추천 데이터가 부족")
	public SuccessResponse<List<BookData.Search>> getBookBasedReccom(@PathVariable Long bookId) {

		List<BookData.Search> bookBasedReccom = recommendationService.getBookBasedReccom(bookId);

		return SuccessResponse.of(bookBasedReccom);
	}
}
