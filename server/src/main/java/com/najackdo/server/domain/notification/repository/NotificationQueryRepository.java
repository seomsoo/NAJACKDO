package com.najackdo.server.domain.notification.repository;

import com.najackdo.server.domain.notification.dto.NotificationDto;

import java.util.List;

public interface NotificationQueryRepository {

    List<NotificationDto.Notification> searchById(NotificationDto.NotificationPaging paging);
}
