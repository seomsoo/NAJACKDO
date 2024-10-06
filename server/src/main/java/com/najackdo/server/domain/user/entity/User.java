package com.najackdo.server.domain.user.entity;

import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.najackdo.server.core.entity.BaseEntity;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.location.entity.ActivityAreaSetting;
import com.najackdo.server.domain.user.dto.UserData;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
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
public class User extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	@Column(name = "username", nullable = false)
	private String username;

	@Column(name = "gender", nullable = false)
	private char gender;

	@Column(name = "age", nullable = false)
	private String age = "선택안됨";

	@Column(nullable = false)
	private String name;

	@Column(name = "nick_name", nullable = false)
	private String nickName;

	@Column(name = "email", nullable = false)
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

	@Column(name = "cash")
	@ColumnDefault("0")
	private int cash = 0;

	@Column(name = "fcm_tocken")
	private String fcmToken;

	@Column(name = "manner_score")
	@ColumnDefault("50")
	private int mannerScore = 50;

	@OneToOne(mappedBy = "user")
	private ActivityAreaSetting activityAreaSetting;

	@OneToMany(mappedBy = "following", fetch = FetchType.LAZY)
	private List<InterestUser> followingUsers;
	//
	// @OneToMany(mappedBy = "follower", fetch = FetchType.LAZY)
	// private Set<InterestUser> followerUsers;
	//
	// @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	// private List<SurveyResult> surveyResults;
	//
	// @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	// private List<BookMark> bookMarks;
	//
	// @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	// private List<RentalReservation> rentalReservations;
	//
	// @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	// private List<Notification> notifications;
	//
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	private List<CashLog> cashLogs;
	//
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Cart> bookCarts;
	//
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<UserBook> userBooks;
	//
	// @OneToMany(mappedBy = "loner", fetch = FetchType.LAZY)
	// private List<Rental> bookRentals;

	public static User createUser(String username, String name, char gender, ProviderType providerType,
		String providerId, String profileImage) {
		User user = new User();
		user.username = username;
		user.name = name;
		user.nickName = name;
		user.email = username;
		user.gender = gender;
		user.providerType = providerType;
		user.providerId = providerId;
		user.profileImage = profileImage;
		return user;
	}

	public void setActivityAreaSetting(ActivityAreaSetting activityAreaSetting) {
		this.activityAreaSetting = activityAreaSetting;
	}

	public void delete() {
		this.isDeleted = true;
	}

	public void updateProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public void updateInfo(UserData.Update update) {
		this.nickName = update.getNickname();
		this.age = update.getAge();
		this.gender = update.getGender();
	}

	public void plusCash(Integer cash) {
		this.cash += cash;
	}

	public void minusCash(Integer cash) {
		this.cash -= cash;
	}

	public void updateCashLog(List<CashLog> cashLog) {
		this.cashLogs = cashLog;
	}

	public void pushToken(String Token) {
		this.fcmToken = Token;
	}

	public void updateMannerScore(int mannerScore) {
		this.mannerScore = mannerScore;
	}
}
