package com.najackdo.server.domain.notification.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	// 1. 송신됬지만 확인되지 않은 알람 조회
	@PostMapping("/searchById")
	public SuccessResponse<List<NotificationDto.Notification>> searchById(@CurrentUser User user,
		@RequestBody NotificationDto.NotificationPaging paging) {

		return SuccessResponse.of(notificationService.searchByUserId(user.getId(), paging));
	}
	//2. 알람 클릭시 읽음 처리 - 보류

}