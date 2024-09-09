package com.najackdo.server.domain.survey.entity;

import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "survey_result")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SurveyResult {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "survey_result_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "survey_question_id", nullable = false)
	private SurveyQuestion surveyQuestion;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;


	public static SurveyResult of(User user, SurveyQuestion surveyQuestion) {
		SurveyResult surveyResult = new SurveyResult();
		surveyResult.user = user;
		surveyResult.surveyQuestion = surveyQuestion;
		return surveyResult;
	}
}