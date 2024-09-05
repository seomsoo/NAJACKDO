package com.najackdo.server.domain.user.entity;

import com.najackdo.server.core.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(
	name = "users",
	uniqueConstraints = {@UniqueConstraint(columnNames = "username")},
	indexes = {
		@Index(name = "index_user_username", columnList = "username")
	}
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User  extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String username;

	@Column(nullable = false)
	private char gender;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String email;

	@Column(name = "provider_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private ProviderType providerType;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private RoleType roleType = RoleType.USER;

	@Column(name = "provider_id", nullable = false)
	private String providerId;

	@Column(name = "profile_image")
	private String profileImage;

	public static User createUser(String username, String name, char gender, ProviderType providerType,
		String providerId) {
		User user = new User();
		user.username = username;
		user.name = name;
		user.email = username;
		user.gender = gender;
		user.providerType = providerType;
		user.providerId = providerId;
		return user;
	}


	public void delete() {
		this.isDeleted = true;
	}

}
