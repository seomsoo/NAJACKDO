package com.najackdo.server.domain.notification.controller;

import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {

    private final NotificationService notificationService;


    @PostMapping("/alarm")
    public String sendNotificationByToken(@RequestBody NotificationDto.NotificationRequest requestDto) {
        return notificationService.sendNotificationByToken(requestDto);
    }
}