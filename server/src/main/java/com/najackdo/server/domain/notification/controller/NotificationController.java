package com.najackdo.server.domain.notification.controller;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.event.NotificationEvent;
import com.najackdo.server.domain.notification.service.NotificationService;
import com.najackdo.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {

    private final NotificationService notificationService;

    // 1. 송신됬지만 확인되지 않은 알람 조회
    @PostMapping("/searchById")
    public SuccessResponse<List<NotificationDto.Notification>> searchById(@CurrentUser User user,@RequestBody NotificationDto.NotificationPaging paging ){

        return SuccessResponse.of(notificationService.searchByUserId(user.getId(), paging));
    }
    //2. 알람 클릭시 읽음 처리 - 보류


}