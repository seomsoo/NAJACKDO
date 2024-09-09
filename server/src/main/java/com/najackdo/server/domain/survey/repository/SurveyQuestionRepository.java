package com.najackdo.server.domain.survey.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.survey.entity.SurveyQuestion;
import com.najackdo.server.domain.survey.entity.SurveyResult;

public interface SurveyQuestionRepository extends JpaRepository<SurveyQuestion, Long> {

}
