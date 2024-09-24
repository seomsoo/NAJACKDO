package com.najackdo.server.domain.survey.event;

import java.util.List;

import com.najackdo.server.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SurveySaveEvent {
	User user;
	List<Long> surveyResults;
}
