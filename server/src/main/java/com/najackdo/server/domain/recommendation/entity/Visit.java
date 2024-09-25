package com.najackdo.server.domain.recommendation.entity;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "visit")
public class Visit {

	@Id
	private String id;

	private Long userId;
	private Long bookId;
	private String genre;

	private int timeSpent;

	private LocalDateTime visitTime = LocalDateTime.now();
}