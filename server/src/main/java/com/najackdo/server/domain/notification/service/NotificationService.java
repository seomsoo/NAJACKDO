package com.najackdo.server.domain.notification.service;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.entity.NotificationType;
import com.najackdo.server.domain.notification.event.NotificationEvent;
import com.najackdo.server.domain.notification.event.NotificationRegistEvent;
import com.najackdo.server.domain.notification.repository.NotificationRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional(readOnly = true)
public class NotificationService {

	private final ApplicationEventPublisher publisher;

	private final FirebaseMessaging firebaseMessaging;

	private final UserRepository usersRepository;

	private final NotificationRepository notificationRepository;

	// 안 본 알람 조회
	public Page<NotificationDto.Notification> searchByUserId(long userId, Pageable pageable) {

		return notificationRepository.searchById(userId, pageable);
	}

	// 알람 읽음 처리
	@Transactional
	public void readSuccess() {
		notificationRepository.updateNotificationIsRead();
		return;
	}

	// 알림
	@TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registNotification(NotificationRegistEvent regist) {
		com.najackdo.server.domain.notification.entity.Notification notification = com.najackdo.server.domain.notification.entity.Notification.createNotification(
			regist);
		notificationRepository.save(notification);
	}

	@EventListener
	// @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	public void sendNotificationEvent(NotificationEvent notificationEvent) {
		User user = usersRepository.findById(notificationEvent.getTargetUserId())
			.orElseThrow(
				() -> new BaseException(ErrorCode.NOT_FOUND_USER)
			);

		if (user.getFcmToken() == null) {
			publisher.publishEvent(
				new NotificationRegistEvent(user, notificationEvent.getType(), false, notificationEvent.getTitle(),
					notificationEvent.getBody()));
			throw new BaseException(ErrorCode.NO_HAD_FCMTOKEN);
		}

		Notification notification = Notification.builder()
			.setTitle(notificationEvent.getTitle())
			.setBody(notificationEvent.getBody())
			.build();
		Message message = Message.builder()
			.setToken(user.getFcmToken())
			.setNotification(notification)
			.build();

		// 알림이 채팅이면 알림 푸시 알람만 전송
		if (notificationEvent.getType().equals(NotificationType.CHAT)) {
			try {
				firebaseMessaging.send(message);
				return;
			} catch (FirebaseMessagingException e) {
				throw new RuntimeException(e);
			}
		}

		try {
			firebaseMessaging.send(message);
			publisher.publishEvent(
				new NotificationRegistEvent(user, notificationEvent.getType(), true, notificationEvent.getTitle(),
					notificationEvent.getBody()));
		} catch (FirebaseMessagingException e) {
			publisher.publishEvent(
				new NotificationRegistEvent(user, notificationEvent.getType(), false, notificationEvent.getTitle(),
					notificationEvent.getBody()));
			throw new BaseException(ErrorCode.NOT_SENDED_ALARM);
		}
	}
}