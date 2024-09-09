package com.najackdo.server.domain.survey.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.survey.entity.SurveyResult;

public interface SurveyResultRepository extends JpaRepository<SurveyResult, Long> {

}
