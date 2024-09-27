package com.najackdo.server.domain.notification.repository;

import com.najackdo.server.domain.notification.dto.NotificationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationQueryRepository {

    public Page<NotificationDto.Notification> searchById(long userId, Pageable pageable);
}
