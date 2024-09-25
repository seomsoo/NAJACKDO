package com.najackdo.server.domain.notification.event;

import com.najackdo.server.domain.notification.entity.NotificationType;
import com.najackdo.server.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationEvent {
    private Long targetUserId;
    private String title;
    private String body;
    private NotificationType type;
}
