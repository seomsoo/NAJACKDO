package com.najackdo.server.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.najackdo.server.domain.user.entity.CashLog;
import com.najackdo.server.domain.user.event.CashLogPaymentEvent;
import com.najackdo.server.domain.user.repository.CashLogRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CashLogService {

	private final CashLogRepository cashLogRepository;

	@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void cashLogPaymentEvent(CashLogPaymentEvent event) {


		CashLog cashLog = CashLog.create(
			event.getUser(),
			event.getCash(),
			event.getResultCash(),
			event.getLogType()
		);


		cashLogRepository.save(cashLog);

	}

}
