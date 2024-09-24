package com.najackdo.server.domain.notification.event;

import com.najackdo.server.domain.notification.entity.NotificationType;
import com.najackdo.server.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationRegistEvent {
    private User user;
    private NotificationType type;
    private Boolean isSend;
    private String title;
    private String content;
}
