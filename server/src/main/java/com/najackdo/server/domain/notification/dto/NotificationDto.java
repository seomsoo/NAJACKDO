package com.najackdo.server.domain.notification.dto;

import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

public class NotificationDto {

    @Data
    public static class Notification {

        private String userId;
        private String content;
        private String title;
        private DateTime createAt;
        private DateTime updateAt;
        private String Type;
    }
}
