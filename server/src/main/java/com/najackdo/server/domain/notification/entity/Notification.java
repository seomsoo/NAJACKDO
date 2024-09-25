package com.najackdo.server.domain.notification.entity;

import com.najackdo.server.core.entity.TimeEntity;
import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.event.NotificationRegistEvent;
import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notification")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification extends TimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notification_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "type")
	@Enumerated(EnumType.STRING)
	private NotificationType type;

	@Column(name = "is_read")
	private Boolean isRead;

	@Column(name = "is_send")
	private Boolean isSend;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	public static Notification createNotification(NotificationRegistEvent regist) {
		Notification notification = new Notification();
		notification.user = regist.getUser();
		notification.type = regist.getType();
		notification.isRead = false;
		notification.isSend = regist.getIsSend();
		notification.title = regist.getTitle();
		notification.content = regist.getContent();
		return notification;
	}
}
