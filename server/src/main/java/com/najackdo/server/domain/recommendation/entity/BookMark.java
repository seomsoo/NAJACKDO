package com.najackdo.server.domain.recommendation.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "book_mark")
public class BookMark {

	@Id
	private String id;

	private Long userId;
	private Long bookId;
	private  String genre;
}