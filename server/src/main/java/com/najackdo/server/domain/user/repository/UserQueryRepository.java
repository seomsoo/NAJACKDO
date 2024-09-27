package com.najackdo.server.domain.user.repository;

import java.util.List;

import org.springframework.data.repository.query.Param;

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
	 * 사용자 ID로 사용자 캐시 로그 조회
	 *
	 * @param userId 사용자 ID
	 * @return {@link List<CashLogResponse>} 사용자 캐시 로그
	 */
	List<CashLogResponse> findUserCashLog(@Param("userId") Long userId);

	/**
	 * 사용자 ID로 사용자 리뷰 긍정/부정 개수 조회
	 *
	 * @param id 사용자 ID
	 * @param positive  리뷰 긍정 여부
	 * @return {@link Long} 리뷰 개수
	 */
	List<UserData.reviewInfo> countUserReviewsByPositive(@Param("id") Long id, @Param("positive") boolean positive);

}
