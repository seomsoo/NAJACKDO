package com.najackdo.server.domain.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.user.dto.UserData;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	/**
	 * 첫 로그인 후 유저 정보 입력 API
	 * @param user
	 * @param update
	 * @return
	 */
	@PostMapping("/info")
	public SuccessResponse<Void> updateUserInfo(
		@CurrentUser User user,
		@RequestBody UserData.Update update) {
		userService.updateUser(user, update);
		return SuccessResponse.empty();
	}

}
