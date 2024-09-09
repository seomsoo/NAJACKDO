package com.najackdo.server.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.user.entity.CashLog;

public interface CashLogRepository extends JpaRepository<CashLog, Long> {

	@Query("SELECT c FROM CashLog c WHERE c.user.id = :userId")
	List<CashLog> findAllByUserId(@Param("userId") Long userId);

	@Modifying
	@Query(value = "INSERT INTO cash_log (user_id, change, log_type, result_cash, created_at) VALUES (:userId, :change, :logType, :resultCash, now())", nativeQuery = true)
	void saveCashLog(@Param("userId") Long userId, @Param("change") Integer change, @Param("logType") String logType,
		@Param("resultCash") Integer resultCash);

}
