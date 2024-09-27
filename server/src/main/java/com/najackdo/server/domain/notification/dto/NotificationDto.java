package com.najackdo.server.domain.notification.dto;

import com.najackdo.server.domain.notification.entity.NotificationType;
import com.najackdo.server.domain.notification.entity.OrderType;
import com.najackdo.server.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;
import org.springdoc.core.converters.models.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public class NotificationDto {

    @Data
    @AllArgsConstructor
    public static class Notification {
        private Long userId;
        private String content;
        private String title;
        private LocalDateTime createAt;
        private LocalDateTime updateAt;
        private NotificationType Type;
    }

    @Data
    public static class NotificationRegist{

    }
}
