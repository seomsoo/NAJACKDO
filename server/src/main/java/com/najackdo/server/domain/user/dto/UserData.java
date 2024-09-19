package com.najackdo.server.domain.user.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.najackdo.server.domain.user.entity.CashLog;
import com.najackdo.server.domain.user.entity.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

//
public class UserData {

	@Data
	public static class Update {

		@NotBlank(message = "닉네임을 입력해 주세요")
		private String nickname;

		@NotNull(message = "성별을 입력해주세요.")
		private char gender;

		@NotNull(message = "나이를 입력해 주세요.")
		private short age;

		@Size(min = 3, message = "관심 분야를 3개 이상 선택해 주세요.")
		private List<Long> interest;
	}

	@Data
	public static class InfoResponse {

		private String nickname;
		private String profileImage;
		private String locationName;
		private int mannerScore;
		private Long goodReviewCount;
		private Long badReviewCount;
		private int cash;
		private int saveCash;
		private int earnCash;

		public static InfoResponse of(
			User user,
			String locationName,
			Long goodReviewCount,
			Long badReviewCount,
			int saveCash,
			int earnCash
		) {
			InfoResponse response = ofWithoutCash(user, locationName, goodReviewCount, badReviewCount);
			response.cash = user.getCash();
			response.saveCash = saveCash;
			response.earnCash = earnCash;
			return response;
		}

		public static InfoResponse ofWithoutCash(
			User user,
			String locationName,
			Long goodReviewCount,
			Long badReviewCount
		) {
			InfoResponse response = new InfoResponse();
			response.nickname = user.getNickName();
			response.profileImage = user.getProfileImage();
			response.locationName = locationName;
			response.mannerScore = user.getMannerScore();
			response.goodReviewCount = goodReviewCount;
			response.badReviewCount = badReviewCount;
			return response;
		}
	}

	@Data
	public static class CashLogResponse {

		private int cash;
		private int resultCash;
		private String type;
		private LocalDateTime createdAt;

		public static CashLogResponse of(CashLog cashLog) {
			CashLogResponse response = new CashLogResponse();
			response.cash = cashLog.getChange();
			response.resultCash = cashLog.getResultCash();
			response.type = cashLog.getLogType().toString();
			response.createdAt = cashLog.getCreatedAt();
			return response;
		}
	}

}
