package com.najackdo.server.domain.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.user.dto.UserData;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
@Tag(name = "유저 관련 API ")
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

	@PostMapping("/pushToken")
	public SuccessResponse<Void> pushToken(
		@CurrentUser User user,
		@RequestBody UserData.PushToken pushToken
	) {
		userService.pushToken(user, pushToken);
		return SuccessResponse.empty();
	}

	/**
	 * 유저 정보 조회 API
	 *
	 * @param user
	 * @return {@link UserData.InfoResponse}
	 */
	@GetMapping("/info")
	@Operation(summary = "유저 정보 조회", description = "유저 정보 조회")
	public SuccessResponse<UserData.InfoResponse> getUserInfo(@CurrentUser User user) {
		return SuccessResponse.of(userService.getUserInfo(user));
	}

	/**
	 * 유저 캐시 로그 조회 API
	 *
	 * @param user
	 * @return {@link List <UserData.CashLogResponse>}
	 */
	@GetMapping("/cashlog")
	@Operation(summary = "유저 캐시 로그 조회", description = "유저 캐시 로그 조회")
	public SuccessResponse<List<UserData.CashLogResponse>> getUserCashLog(@CurrentUser User user) {
		return SuccessResponse.of(userService.getUserCashLog(user));
	}

	/**
	 * 유저 닉네임으로 유저 정보 조회 API
	 *
	 * @param nickname
	 * @return {@link UserData.InfoResponse}
	 */
	@GetMapping("/info/{nickname}")
	@Operation(summary = "유저 닉네임으로 유저 정보 조회", description = "유저 닉네임으로 유저 정보 조회")
	public SuccessResponse<UserData.InfoResponse> getUserInfoByNickName(@PathVariable String nickname) {
		return SuccessResponse.of(userService.getUserInfoByNickName(nickname));
	}

	/**
	 * 유저 팔로우 관심 책장 추가 API
	 *
	 * @param user
	 * @param userId
	 * @return
	 */
	@PostMapping("/interest-user/{userId}")
	@Operation(summary = "유저 팔로우( 관심 책장)  추가", description = "유저 팔로우 (관심 책장) 추가")
	public SuccessResponse<Void> interestUser(@CurrentUser User user, @PathVariable Long userId) {
		userService.addInterestUser(user, userId);
		return SuccessResponse.empty();
	}

	/**
	 * 유저 팔로우 관심 책장 삭제 API
	 *
	 * @param user
	 * @param userId
	 * @return
	 */
	@DeleteMapping("/interest-user/{userId}")
	@Operation(summary = "유저 팔로우( 관심 책장)  삭제", description = "유저 팔로우 (관심 책장) 삭제")
	public SuccessResponse<Void> unInterestUser(@CurrentUser User user, @PathVariable Long userId) {
		userService.removeInterestUser(user, userId);
		return SuccessResponse.empty();
	}

	/**
	 * 유저 닉네임 조회 API
	 *
	 * @param user
	 * @return {@link UserData.NicknameResponse}
	 */
	@GetMapping("/nickname")
	@Operation(summary = "유저 닉네임 조회", description = "유저 닉네임 조회")
	public SuccessResponse<UserData.NicknameResponse> getNickname(@CurrentUser User user) {
		return SuccessResponse.of(UserData.NicknameResponse.of(user.getNickName()));
	}

	/**
	 * 닉네임 중복 조회
	 *
	 * @param nickname
	 * @return {@link Boolean}
	 */
	@GetMapping("/available-nickname/{nickname}")
	@Operation(summary = "닉네임 중복 조회", description = "닉네임 중복 조회")
	public SuccessResponse<Boolean> availableNickname(@CurrentUser User user, @PathVariable String nickname) {
		return SuccessResponse.of(userService.availableNickname(user.getNickName(), nickname));
	}

	/**
	 * 유저 정보 유효성 조회 (로그인, 설문 여부, 위치 정보)
	 *
	 * @param user
	 * @return {@link UserData.ValidResponse}
	 */
	@GetMapping("/valid")
	@Operation(summary = "유저 정보 유효성 조회", description = "유저 정보 유효성 조회")
	public SuccessResponse<UserData.ValidResponse> valid(@CurrentUser User user) {
		return SuccessResponse.of(userService.valid(user));
	}

}
