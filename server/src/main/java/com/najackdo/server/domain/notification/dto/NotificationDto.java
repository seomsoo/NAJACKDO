package com.najackdo.server.domain.notification.dto;

import lombok.Builder;
import lombok.Data;

public class NotificationDto {

    @Data
    public static class NotificationRequest {
        private Long targetUserId;
        private String title;
        private String body;

        @Builder
        public NotificationRequest(Long targetUserId, String title, String body) {
            this.targetUserId = targetUserId;
            this.title = title;
            this.body = body;
        }
    }
}
