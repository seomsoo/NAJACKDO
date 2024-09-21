package com.najackdo.server.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.user.entity.InterestUser;
import com.najackdo.server.domain.user.entity.User;

public interface InterestUserRepository extends JpaRepository<InterestUser, Long> {

	boolean existsByFollowerAndAndFollowing(User follower, User following);

	void deleteByFollowerAndFollowing(User user, User followingUser);
}
