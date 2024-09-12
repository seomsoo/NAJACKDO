package com.najackdo.server.domain.user.entity;

import com.najackdo.server.core.entity.TimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "cash_log")
@Getter
@NoArgsConstructor
@ToString
public class CashLog extends TimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cash_log_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "change")
	private Integer change;

	@Column(name = "log_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private CashLogType logType;

	@Column(name = "result_cash")
	private Integer resultCash;

	public static CashLog create(User user, Integer change, Integer resultCash, CashLogType logType) {
		CashLog cashLog = new CashLog();
		cashLog.user = user;
		cashLog.change = change;
		cashLog.resultCash = resultCash;
		cashLog.logType = logType;
		return cashLog;
	}
}
