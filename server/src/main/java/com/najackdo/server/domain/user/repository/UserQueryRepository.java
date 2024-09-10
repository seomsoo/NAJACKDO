package com.najackdo.server.domain.user.repository;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.rental.entity.ReviewItems;
import com.najackdo.server.domain.user.dto.UserData;
import com.najackdo.server.domain.user.dto.UserData.CashLogResponse;

public interface UserQueryRepository {

	/**
	 * 사용자 ID로 절약 금액 조회
	 *
	 * @param userId 사용자 ID
	 * @return {@link Integer} 절약 금액
	 */
	Integer findUserSavingCash(@Param("userId") Long userId);

	/**
	 * 사용자 ID로 벌어들인 금액 조회
	 *
	 * @param userId 사용자 ID
	 * @return {@link Integer} 벌어들인 금액
	 */
	Integer findUserEarningCash(@Param("userId") Long userId);

	/**
	 * 사용자 ID로 사용자 지역 이름 조회
	 *
	 * @param userId 사용자 ID
	 * @return {@link String} 사용자 지역
	 */
	String findUserLocationName(@Param("userId") Long userId);

	/**
	 * 사용자 ID로 사용자 특정 리뷰 개수 조회
	 *
	 * @param userId 사용자 ID
	 * @return {@link Long} 사용자 리뷰 개수
	 */
	Long countUserReviewsByItem(Long userId, ReviewItems reviewItem);

	/**
	 * 사용자 ID로 사용자 캐시 로그 조회
	 *
	 * @param userId 사용자 ID
	 * @return {@link List<CashLogResponse>} 사용자 캐시 로그
	 */
	List<CashLogResponse> findUserCashLog(Long userId);

	/**
	 * 사용자 ID로 사용자 관심책장 조회
	 *
	 * @param id 사용자 ID
	 * @return {@link List<UserData.InterestResponse>} 사용자 관심책장
	 */
	List<UserData.InterestResponse> findUserInterest(Long id);
}
