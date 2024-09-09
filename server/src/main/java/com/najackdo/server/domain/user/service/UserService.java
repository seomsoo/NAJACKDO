package com.najackdo.server.domain.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.survey.entity.SurveyQuestion;
import com.najackdo.server.domain.survey.entity.SurveyResult;
import com.najackdo.server.domain.survey.repository.SurveyQuestionRepository;
import com.najackdo.server.domain.survey.repository.SurveyResultRepository;
import com.najackdo.server.domain.user.dto.UserData;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

	private final UserRepository userRepository;
	private final SurveyResultRepository serveyResultRepository;
	private final SurveyQuestionRepository surveyQuestionRepository;

	@Transactional
	public void updateUser(User user, UserData.Update update) {
		user.updateInfo(update);
		userRepository.save(user);

		List<SurveyResult> surveyResults = update.getInterest().stream()
			.map(id -> surveyQuestionRepository.findById(id)
				.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_SURVEY_RESULT)))
			.map(surveyQuestion -> SurveyResult.of(user, surveyQuestion))
			.collect(Collectors.toList());

		serveyResultRepository.saveAll(surveyResults);
	}
}
