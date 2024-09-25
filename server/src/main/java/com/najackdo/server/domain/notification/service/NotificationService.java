package com.najackdo.server.domain.notification.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.notification.dto.NotificationDto;

import com.najackdo.server.domain.notification.event.NotificationEvent;
import com.najackdo.server.domain.notification.event.NotificationRegistEvent;
import com.najackdo.server.domain.notification.repository.NotificationRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.event.CashLogPaymentEvent;
import com.najackdo.server.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.List;
import java.util.Optional;

import static com.najackdo.server.domain.user.entity.CashLogType.PAYMENT;

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
    public List<NotificationDto.Notification> searchByUserId(long userId, NotificationDto.NotificationPaging paging){

        return notificationRepository.searchById(userId,paging);
    }
    // 반납 알림
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registNotification(NotificationRegistEvent regist) {
        log.info("알람 등록");
        com.najackdo.server.domain.notification.entity.Notification notification = com.najackdo.server.domain.notification.entity.Notification.createNotification(regist);
        notificationRepository.save(notification);
    }


    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void sendNotificationEvent(NotificationEvent notificationEvent) {
        log.info("알람 송신");
        Optional<User> user = usersRepository.findById(notificationEvent.getTargetUserId());
        if (user.isPresent()) {
            if (user.get().getFcmToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle(notificationEvent.getTitle())
                        .setBody(notificationEvent.getBody())
                        .build();
//                log.info("토큰 : "+ user.get().getFcmToken());
                Message message = Message.builder()
                        .setToken(user.get().getFcmToken())
                        .setNotification(notification)
                        .build();

                try {
//                    log.info("알람 송신 성공");
                    firebaseMessaging.send(message);
                    publisher.publishEvent(new NotificationRegistEvent(user.get(),notificationEvent.getType(),true,notificationEvent.getTitle(),notificationEvent.getBody()));
//                    log.info("끝");
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    publisher.publishEvent(new NotificationRegistEvent(user.get(),notificationEvent.getType(),false,notificationEvent.getTitle(),notificationEvent.getBody()));
                    new BaseException(ErrorCode.NOT_SENDED_ALARM);
                }
            } else {
                publisher.publishEvent(new NotificationRegistEvent(user.get(),notificationEvent.getType(),false,notificationEvent.getTitle(),notificationEvent.getBody()));
                new BaseException(ErrorCode.NO_HAD_FCMTOKEN);
            }
        } else {
            new BaseException(ErrorCode.NOT_FOUND_USER);
        }
    }
}