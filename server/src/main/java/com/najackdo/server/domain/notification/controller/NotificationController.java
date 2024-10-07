package com.najackdo.server.domain.notification.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.service.NotificationService;
import com.najackdo.server.domain.user.entity.User;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notification")
@Tag(name = "알림 관련 API ")
public class NotificationController {

	private final NotificationService notificationService;

	/**
	 * 조회하지 않은 알람 조회
	 *
	 * @param pageable
	 * @return
	 */
	// 1. 송신됬지만 확인되지 않은 알람 조회
	@GetMapping("/searchById")
	public SuccessResponse<Page<NotificationDto.Notification>> searchById(@CurrentUser User user,
		@PageableDefault(size = 10) Pageable pageable) {

		return SuccessResponse.of(notificationService.searchByUserId(user.getId(), pageable));
	}

	/**
	 * 알람들 성공적 조회시 읽음 처리
	 *
	 * @return
	 */
	@PostMapping("/readSucess")
	public SuccessResponse<Void> readSucess(@CurrentUser User user) {
		notificationService.readSuccess();
		return SuccessResponse.empty();
	}
}