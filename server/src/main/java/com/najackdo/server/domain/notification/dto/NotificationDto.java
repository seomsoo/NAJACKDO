package com.najackdo.server.domain.notification.dto;

import lombok.Builder;
import lombok.Data;

public class NotificationDto {

    @Data
    public static class NotificationRequest {
        private Long targetUserId;
        private String title;
        private String body;

        public static NotificationRequest createNotificationRequest(Long targetUserId, String title, String body){
            NotificationRequest request = new NotificationRequest();
            request.setTargetUserId(targetUserId);
            request.setTitle(title);
            request.setBody(body);
            return request;
        }

    }
}
