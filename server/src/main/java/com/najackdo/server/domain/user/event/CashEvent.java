package com.najackdo.server.domain.user.event;

import com.najackdo.server.domain.user.entity.CashLogType;
import com.najackdo.server.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CashEvent {
	private User user;
	private Integer cash;
	private CashLogType logType;
}
