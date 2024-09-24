package com.najackdo.server.domain.notification.repository;

import com.najackdo.server.domain.notification.entity.Notification;
import com.najackdo.server.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>, NotificationQueryRepository {

}
