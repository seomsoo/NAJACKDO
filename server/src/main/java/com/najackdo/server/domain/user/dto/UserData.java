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
		private String age;

		@Size(min = 3, message = "관심 분야를 3개 이상 선택해 주세요.")
		private List<Long> interest;
	}

	@Data
	public static class PushToken {
		@NotBlank(message = "토큰이 비어있습니다.")
		private String token;
	}

	@Data
	public static class reviewInfo {
		private Long reviewId;
		private String content;
		private Long count;

		public static reviewInfo of(Long reviewId, String content, Long count) {
			reviewInfo response = new reviewInfo();
			response.reviewId = reviewId;
			response.content = content;
			response.count = count;
			return response;
		}
	}

	@Data
	public static class InfoResponse {

		private Long userId;
		private String nickname;
		private String profileImage;
		private String locationName;
		private int mannerScore;
		List<reviewInfo> goodReviewInfo;
		List<reviewInfo> badReviewInfo;
		private int cash;
		private Integer saveCash;
		private Integer earnCash;

		public static InfoResponse of(
			User user,
			String locationName,
			List<reviewInfo> goodReviewInfo,
			List<reviewInfo> badReviewInfo,
			Integer saveCash,
			Integer earnCash
		) {
			InfoResponse response = ofWithoutCash(user, locationName, goodReviewInfo, badReviewInfo);
			response.cash = user.getCash();
			response.saveCash = saveCash;
			response.earnCash = earnCash;
			return response;
		}

		public static InfoResponse ofWithoutCash(
			User user,
			String locationName,
			List<reviewInfo> goodReviewInfo,
			List<reviewInfo> badReviewInfo
		) {
			InfoResponse response = new InfoResponse();
			response.userId = user.getId();
			response.nickname = user.getNickName();
			response.profileImage = user.getProfileImage();
			response.locationName = locationName;
			response.mannerScore = user.getMannerScore();
			response.goodReviewInfo = goodReviewInfo;
			response.badReviewInfo = badReviewInfo;
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

	@Data
	public static class InterestUserRequest {

		@NotNull(message = "관심 사용자 아이디를 입력해 주세요.")
		private Long interestUserId;
	}

	@Data
	public static class NicknameResponse {

		private String nickname;

		public static NicknameResponse of(String nickname) {
			NicknameResponse response = new NicknameResponse();
			response.nickname = nickname;
			return response;
		}
	}

	@Data
	public static class ValidResponse {
		private boolean isSurvey;
		private boolean isLocation;

		public static ValidResponse of(boolean isSurvey, boolean isLocation) {
			ValidResponse response = new ValidResponse();
			response.isSurvey = isSurvey;
			response.isLocation = isLocation;
			return response;
		}
	}
}
