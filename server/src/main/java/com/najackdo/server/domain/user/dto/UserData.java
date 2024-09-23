package com.najackdo.server.domain.user.dto;

import java.util.List;

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
	public static class PushToken{
		@NotBlank(message = "토큰이 비어있습니다.")
		private String token;
	}
}
