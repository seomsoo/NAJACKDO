package com.najackdo.server.domain.user.service;

import static com.najackdo.server.domain.user.entity.CashLogType.*;

import java.util.List;
import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.survey.event.SurveySaveEvent;
import com.najackdo.server.domain.survey.service.SurveyResultService;
import com.najackdo.server.domain.user.dto.UserData;
import com.najackdo.server.domain.user.entity.InterestUser;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.event.CashLogPaymentEvent;
import com.najackdo.server.domain.user.event.UserPaymentEvent;
import com.najackdo.server.domain.user.repository.InterestUserRepository;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

	private final InterestUserRepository interestUserRepository;
	private final ApplicationEventPublisher eventPublisher;
	private final UserRepository userRepository;
	private final SurveyResultService surveyResultService;

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

		findUser.plusCash(cash);
		eventPublisher.publishEvent(new CashLogPaymentEvent(user, cash, findUser.getCash(), PAYMENT));
		userRepository.save(findUser);
	}

	@Transactional
	public void pushToken(User user, UserData.PushToken pushToken) {
		user.pushToken(pushToken.getToken());
		userRepository.save(user);
	}

	public UserData.InfoResponse getUserInfo(User user) {
		String locationName = userRepository.findUserLocationName(user.getId());

		List<UserData.reviewInfo> goodReviews = userRepository.countUserReviewsByPositive(user.getId(), true);
		List<UserData.reviewInfo> badReviews = userRepository.countUserReviewsByPositive(user.getId(), false);
		Integer saveCash = userRepository.findUserSavingCash(user.getId());
		Integer earnCash = userRepository.findUserEarningCash(user.getId());
		return UserData.InfoResponse.of(user, locationName, goodReviews, badReviews, saveCash, earnCash);
	}

	public List<UserData.CashLogResponse> getUserCashLog(User user) {
		return userRepository.findUserCashLog(user.getId());
	}

	public UserData.InfoResponse getUserInfoByNickName(String nickname) {
		User user = userRepository.findByNickname(nickname)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
		String locationName = userRepository.findUserLocationName(user.getId());
		List<UserData.reviewInfo> goodReviews = userRepository.countUserReviewsByPositive(user.getId(), true);
		List<UserData.reviewInfo> badReviews = userRepository.countUserReviewsByPositive(user.getId(), false);
		return UserData.InfoResponse.ofWithoutCash(user, locationName, goodReviews,
			badReviews);
	}

	@Transactional
	public void addInterestUser(User user, Long userId) {
		User followingUser = userRepository.findById(userId)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		if (followingUser.getId() == user.getId()) {
			throw new BaseException(ErrorCode.INVALID_FOLLOW_BY_MYSELF);
		}

		InterestUser.of(user, followingUser);

		if (interestUserRepository.existsByFollowerAndAndFollowing(user, followingUser)) {

			throw new BaseException(ErrorCode.INTERESTUSER_ALREADY_EXIST);
		}
		interestUserRepository.save(InterestUser.of(user, followingUser));
	}

	@Transactional
	public void removeInterestUser(User user, Long userId) {
		User followingUser = userRepository.findById(userId)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		interestUserRepository.deleteByFollowerAndFollowing(user, followingUser);
	}

	public Boolean availableNickname(String userNickname, String nickname) {
		Optional<User> byNickname = userRepository.findByNickname(nickname);
		if (byNickname.isEmpty() || byNickname.get().getNickName().equals(userNickname)) {
			return true;
		}
		return false;
	}

	public UserData.ValidResponse valid(User user) {
		boolean isSurvey = surveyResultService.isVaildSurvey(user.getId());
		boolean isLocation = user.getActivityAreaSetting() != null;

		return UserData.ValidResponse.of(isSurvey, isLocation);
	}
}
