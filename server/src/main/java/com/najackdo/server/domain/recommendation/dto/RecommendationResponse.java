package com.najackdo.server.domain.recommendation.dto;

import java.util.List;

import lombok.Data;

@Data
public class RecommendationResponse {
	private List<Integer> bookIds;
}