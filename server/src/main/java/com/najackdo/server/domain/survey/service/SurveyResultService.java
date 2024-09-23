package com.najackdo.server.domain.survey.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.survey.entity.SurveyResult;
import com.najackdo.server.domain.survey.event.SurveySaveEvent;
import com.najackdo.server.domain.survey.repository.SurveyQuestionRepository;
import com.najackdo.server.domain.survey.repository.SurveyResultRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SurveyResultService {

	private final SurveyResultRepository serveyResultRepository;
	private final SurveyQuestionRepository surveyQuestionRepository;

	@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void saveSurveyResult(SurveySaveEvent event) {

		List<SurveyResult> surveyResults = event.getSurveyResults().stream()
			.map(id -> surveyQuestionRepository.findById(id)
				.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_SURVEY_RESULT)))
			.map(surveyQuestion -> SurveyResult.of(event.getUser(), surveyQuestion))
			.collect(Collectors.toList());

		serveyResultRepository.saveAll(surveyResults);

	}

	public boolean isVaildSurvey(Long userId) {
		List<SurveyResult> byUserId = serveyResultRepository.findByUserId(userId);

		return !byUserId.isEmpty();
	}

}
