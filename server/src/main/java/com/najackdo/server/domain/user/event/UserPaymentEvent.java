package com.najackdo.server.domain.user.event;

import com.najackdo.server.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserPaymentEvent {
	private User user;
	private Integer cash;
}
