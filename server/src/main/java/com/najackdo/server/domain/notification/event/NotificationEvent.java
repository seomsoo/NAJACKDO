package com.najackdo.server.domain.notification.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationEvent {
    private Long targetUserId;
    private String title;
    private String body;
}
