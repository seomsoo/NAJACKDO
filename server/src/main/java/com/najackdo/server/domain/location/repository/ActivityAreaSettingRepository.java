package com.najackdo.server.domain.location.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.location.entity.ActivityAreaSetting;
import com.najackdo.server.domain.user.entity.User;

public interface ActivityAreaSettingRepository extends JpaRepository<ActivityAreaSetting, Long> {

	Optional<ActivityAreaSetting> findByUser(User user);
}
