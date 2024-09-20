package com.najackdo.server.domain.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interest_user")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterestUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "interest_user_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "follower_id", nullable = false)
	private User follower;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "following_id", nullable = false)
	private User following;


	public static InterestUser of(User follower, User following) {
		InterestUser interestUser = new InterestUser();
		interestUser.follower = follower;
		interestUser.following = following;
		return interestUser;
	}
}
