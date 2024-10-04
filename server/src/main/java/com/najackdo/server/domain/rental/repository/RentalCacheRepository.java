package com.najackdo.server.domain.rental.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RentalCacheRepository {
	private final RedisTemplate<String, String> redisTemplate;

	private static final String RENTAL_KEY = "rental:";

	public boolean isExistRentalReview(Long rentalId, Long sender, Long receiver) {
		return redisTemplate.hasKey(RENTAL_KEY + ":" + rentalId + ":" + sender + ":" + receiver);
	}

	public void saveRentalReview(Long rentalId, Long sender, Long receiver) {
		redisTemplate.opsForValue().set(RENTAL_KEY + ":" + rentalId + ":" + sender + ":" + receiver, "1");
	}
}
