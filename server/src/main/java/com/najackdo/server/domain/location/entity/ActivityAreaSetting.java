package com.najackdo.server.domain.location.entity;

import org.hibernate.annotations.ColumnDefault;

import com.najackdo.server.core.entity.TimeEntity;
import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "activity_areas", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id"}))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ActivityAreaSetting extends TimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "activity_areas_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_code", nullable = false)
	private Location location;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "distance_meters", nullable = false)
	@ColumnDefault("0.15")
	private Double distanceMeters;

	public static ActivityAreaSetting create(User user, Location location, Double distanceMeters) {
		ActivityAreaSetting activityAreaSetting = new ActivityAreaSetting();
		activityAreaSetting.user = user;
		activityAreaSetting.location = location;
		activityAreaSetting.distanceMeters = distanceMeters;
		return activityAreaSetting;
	}

	public void updateLocation(Location location) {
		this.location = location;
	}

	public void setDistanceMeters(Double distanceMeters) {
		this.distanceMeters = distanceMeters;
	}

}
