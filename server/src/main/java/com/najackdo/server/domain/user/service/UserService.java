package com.najackdo.server.domain.user.service;

import static com.najackdo.server.domain.rental.entity.ReviewItems.*;
import static com.najackdo.server.domain.user.entity.CashLogType.*;

import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.survey.event.SurveySaveEvent;
import com.najackdo.server.domain.user.dto.UserData;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.event.CashLogPaymentEvent;
import com.najackdo.server.domain.user.event.UserPaymentEvent;
import com.najackdo.server.domain.user.repository.UserQueryRepository;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

	private final ApplicationEventPublisher eventPublisher;
	private final UserRepository userRepository;
	private final UserQueryRepository userQueryRepository;

	@Transactional
	public void updateUser(User user, UserData.Update update) {

		user.updateInfo(update);
		userRepository.save(user);

		eventPublisher.publishEvent(new SurveySaveEvent(user, update.getInterest()));
	}

	@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void userPaymentEvent(UserPaymentEvent event) {

		User user = event.getUser();
		Integer cash = event.getCash();

		User findUser = userRepository.findById(user.getId())
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		findUser.addCash(cash);
		eventPublisher.publishEvent(new CashLogPaymentEvent(user, cash, findUser.getCash(), PAYMENT));
		userRepository.save(findUser);
	}

	public UserData.InfoResponse getUserInfo(User user) {
		String locationName = userQueryRepository.findUserLocationName(user.getId());
		Long goodReviewCount = userQueryRepository.countUserReviewsByItem(user.getId(), GOOD);
		Long badReviewCount = userQueryRepository.countUserReviewsByItem(user.getId(), BAD);
		int saveCash = userQueryRepository.findUserSavingCash(user.getId());
		int earnCash = userQueryRepository.findUserEarningCash(user.getId());
		return UserData.InfoResponse.of(user, locationName, goodReviewCount, badReviewCount, saveCash, earnCash);
	}

	public List<UserData.CashLogResponse> getUserCashLog(User user) {
		return userQueryRepository.findUserCashLog(user.getId());
	}
	
}
