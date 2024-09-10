package com.najackdo.server.domain.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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

	/**
	 * 유저 정보 조회 API
	 * @param user
	 * @return UserData.Response
	 */
	@GetMapping("/info")
	public SuccessResponse<UserData.InfoResponse> getUserInfo(@CurrentUser User user) {
		return SuccessResponse.of(userService.getUserInfo(user));
	}

	/**
	 * 유저 캐시 로그 조회 API
	 * @param user
	 * @return UserData.CashLogResponse
	 */
	@GetMapping("/cashlog")
	public SuccessResponse<List<UserData.CashLogResponse>> getUserCashLog(@CurrentUser User user) {
		return SuccessResponse.of(userService.getUserCashLog(user));
	}
}
