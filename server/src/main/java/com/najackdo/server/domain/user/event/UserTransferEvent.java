package com.najackdo.server.domain.user.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserTransferEvent {

	private Long customerId;
	private Long ownerId;
	private int rentalCost;

}
