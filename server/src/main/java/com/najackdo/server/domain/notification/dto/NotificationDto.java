package com.najackdo.server.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.joda.time.DateTime;

public class NotificationDto {

    @Data
    @AllArgsConstructor
    public static class Notification {
        private String userId;
        private String content;
        private String title;
        private DateTime createAt;
        private DateTime updateAt;
        private String Type;
    }

    @Data
    public static class NotificationPaging{
        private int pageSize;
        private int pageNumber;
    }
}
