package com.najackdo.server.domain.location.repository;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LocationCacheRepository {

	private static final String Location_KEY = "location:";
	private final RedisTemplate<String, Object> redisTemplate;

	public void deleteUserLocation(Long userId) {
		redisTemplate.delete(Location_KEY + userId);
	}

	public void saveUserLocation(Long userId, List<Integer> locations) {
		for (Integer location : locations) {
			redisTemplate.opsForSet().add(Location_KEY + userId, location);
		}

	}

	public Set<Object> getUserNearLocation(Long userId) {
		return redisTemplate.opsForSet().members(Location_KEY + userId);
	}

	public Set<String> getAllUserLocations() {
		return redisTemplate.keys(Location_KEY + "*");
	}

	public Set<Object> getOtherUserLocations(String otherKey) {
		return redisTemplate.opsForSet().members(otherKey);
	}
}
