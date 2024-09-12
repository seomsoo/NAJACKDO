package com.najackdo.server.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.user.entity.CashLog;

public interface CashLogRepository extends JpaRepository<CashLog, Long> {

	@Query("SELECT c FROM CashLog c WHERE c.user.id = :userId")
	List<CashLog> findAllByUserId(@Param("userId") Long userId);

}
