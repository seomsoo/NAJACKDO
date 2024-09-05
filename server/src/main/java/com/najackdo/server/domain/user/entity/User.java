package com.najackdo.server.domain.user.entity;

import java.util.List;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import com.najackdo.server.domain.book.entity.BookMark;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.notification.entity.Notification;
import com.najackdo.server.domain.rental.entity.Rental;
import com.najackdo.server.domain.rental.entity.RentalReservation;
import com.najackdo.server.domain.survey.entity.SurveyResult;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

	@OneToMany(mappedBy = "following", fetch = FetchType.LAZY)
	private Set<InterestUser> followingUsers;

	@OneToMany(mappedBy = "follower", fetch = FetchType.LAZY)
	private Set<InterestUser> followerUsers;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	private List<SurveyResult> surveyResults;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	private List<BookMark> bookMarks;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	private List<RentalReservation> rentalReservations;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	private List<Notification> notifications;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	private List<CashLog> cashLogs;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<Cart> bookCarts;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<UserBook> userBooks;

	@OneToMany(mappedBy = "loner", fetch = FetchType.LAZY)
	private List<Rental> bookRentals;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	@Column(name = "user_name", nullable = false)
	private String userName;

	@Column(name = "gender", nullable = false)
	private String gender;

	@Column(name = "age", nullable = false)
	private int age;

	@Column(name = "nick_name", nullable = false)
	private String nickName;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "provider_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private ProviderType providerType;

	@Column(name = "provider_id", nullable = false)
	private String providerId;

	@Column(name = "profile_image")
	private String profileImage;

	@Column(name = "role_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private RoleType roleType;

	@Column(name = "cash")
	@ColumnDefault("0")
	private int cash = 0;

	@Column(name = "fcm_tocken")
	private String fcmToken;

	@Column(name = "manner_score")
	@ColumnDefault("50")
	private int mannerScore = 50;

}
