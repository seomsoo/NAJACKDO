package com.najackdo.server.domain.location.repository;

import java.util.Optional;

import org.hibernate.annotations.processing.SQL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.location.entity.ActivityAreaSetting;
import com.najackdo.server.domain.user.entity.User;

public interface ActivityAreaSettingRepository extends JpaRepository<ActivityAreaSetting, Long> {

	Optional<ActivityAreaSetting> findByUser(User user);

	@Query("select a from ActivityAreaSetting a JOIN FETCH a.location where a.user.id = :userId")
	Optional<ActivityAreaSetting> findUserActivityArea(@Param("userId") Long userId);

}
