package com.najackdo.server.domain.recommendation.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookSpineDetectionResponse {
    List<String> titles;
}
