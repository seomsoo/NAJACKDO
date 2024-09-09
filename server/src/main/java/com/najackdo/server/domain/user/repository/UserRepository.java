package com.najackdo.server.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	/**
	 * 사용자 이름으로 사용자 조회
	 *
	 * @param username 사용자 이름
	 * @return {@link User} 사용자 엔티티 (존재하지 않으면, {@link Optional#empty()} 반환)
	 */
	@Query("SELECT u FROM User u WHERE u.username = :username")
	Optional<User> findByUsername(@Param("username") String username);

	// /**
	//  * 사용자 ID로 사용자 조회 (프로필 정보 포함)
	//  *
	//  * @param userId 사용자 ID
	//  * @return {@link User} 프로필 데이터가 포함된 사용자 엔티티 (존재하지 않으면, {@link Optional#empty()} 반환)
	//  */
	// @Query("SELECT u FROM User u  WHERE u.id = :userId")
	// Optional<User> findUserWithProfileById(@Param("userId") Long userId);

	/**
	 * 사용자 ID로 사용자 캐쉬 정보 업데이트
	 *
	 * @param userId 사용자 ID
	 * @param cash 사용자 캐쉬
	 *
	 */
	@Modifying
	@Query("UPDATE User u SET u.cash = :cash WHERE u.id = :userId")
	void updateUserCash(@Param("userId") Long userId, @Param("cash") Integer cash);
}