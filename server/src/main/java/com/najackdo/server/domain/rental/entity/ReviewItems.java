package com.najackdo.server.domain.rental.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "review_items")
@NoArgsConstructor
public class ReviewItems {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "review_item_id")
	private Long Id;

	@Column(name = "content")
	private String content;

	@Column(name = "positive")
	private boolean positive;

}
