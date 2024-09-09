package com.najackdo.server.domain.user.service;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.user.entity.CashLogType;
import com.najackdo.server.domain.user.event.CashEvent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CashLogService {

	@Transactional
	@EventListener
	public void handleCashEvent(CashEvent event) {

		Long userId = event.getUser().getId();
		Integer cash = event.getCash();
		CashLogType logType = event.getLogType();

	}

}
