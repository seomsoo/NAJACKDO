package com.najackdo.server.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1940316214L;

    public static final QUser user = new QUser("user");

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final ListPath<com.najackdo.server.domain.cart.entity.Cart, com.najackdo.server.domain.cart.entity.QCart> bookCarts = this.<com.najackdo.server.domain.cart.entity.Cart, com.najackdo.server.domain.cart.entity.QCart>createList("bookCarts", com.najackdo.server.domain.cart.entity.Cart.class, com.najackdo.server.domain.cart.entity.QCart.class, PathInits.DIRECT2);

    public final ListPath<com.najackdo.server.domain.book.entity.BookMark, com.najackdo.server.domain.book.entity.QBookMark> bookMarks = this.<com.najackdo.server.domain.book.entity.BookMark, com.najackdo.server.domain.book.entity.QBookMark>createList("bookMarks", com.najackdo.server.domain.book.entity.BookMark.class, com.najackdo.server.domain.book.entity.QBookMark.class, PathInits.DIRECT2);

    public final ListPath<com.najackdo.server.domain.rental.entity.Rental, com.najackdo.server.domain.rental.entity.QRental> bookRentals = this.<com.najackdo.server.domain.rental.entity.Rental, com.najackdo.server.domain.rental.entity.QRental>createList("bookRentals", com.najackdo.server.domain.rental.entity.Rental.class, com.najackdo.server.domain.rental.entity.QRental.class, PathInits.DIRECT2);

    public final NumberPath<Integer> cash = createNumber("cash", Integer.class);

    public final ListPath<CashLog, QCashLog> cashLogs = this.<CashLog, QCashLog>createList("cashLogs", CashLog.class, QCashLog.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final StringPath fcmToken = createString("fcmToken");

    public final SetPath<InterestUser, QInterestUser> followerUsers = this.<InterestUser, QInterestUser>createSet("followerUsers", InterestUser.class, QInterestUser.class, PathInits.DIRECT2);

    public final SetPath<InterestUser, QInterestUser> followingUsers = this.<InterestUser, QInterestUser>createSet("followingUsers", InterestUser.class, QInterestUser.class, PathInits.DIRECT2);

    public final StringPath gender = createString("gender");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> mannerScore = createNumber("mannerScore", Integer.class);

    public final StringPath nickName = createString("nickName");

    public final ListPath<com.najackdo.server.domain.notification.entity.Notification, com.najackdo.server.domain.notification.entity.QNotification> notifications = this.<com.najackdo.server.domain.notification.entity.Notification, com.najackdo.server.domain.notification.entity.QNotification>createList("notifications", com.najackdo.server.domain.notification.entity.Notification.class, com.najackdo.server.domain.notification.entity.QNotification.class, PathInits.DIRECT2);

    public final StringPath profileImage = createString("profileImage");

    public final StringPath providerId = createString("providerId");

    public final EnumPath<ProviderType> providerType = createEnum("providerType", ProviderType.class);

    public final ListPath<com.najackdo.server.domain.rental.entity.RentalReservation, com.najackdo.server.domain.rental.entity.QRentalReservation> rentalReservations = this.<com.najackdo.server.domain.rental.entity.RentalReservation, com.najackdo.server.domain.rental.entity.QRentalReservation>createList("rentalReservations", com.najackdo.server.domain.rental.entity.RentalReservation.class, com.najackdo.server.domain.rental.entity.QRentalReservation.class, PathInits.DIRECT2);

    public final EnumPath<RoleType> roleType = createEnum("roleType", RoleType.class);

    public final ListPath<com.najackdo.server.domain.survey.entity.SurveyResult, com.najackdo.server.domain.survey.entity.QSurveyResult> surveyResults = this.<com.najackdo.server.domain.survey.entity.SurveyResult, com.najackdo.server.domain.survey.entity.QSurveyResult>createList("surveyResults", com.najackdo.server.domain.survey.entity.SurveyResult.class, com.najackdo.server.domain.survey.entity.QSurveyResult.class, PathInits.DIRECT2);

    public final ListPath<com.najackdo.server.domain.book.entity.UserBook, com.najackdo.server.domain.book.entity.QUserBook> userBooks = this.<com.najackdo.server.domain.book.entity.UserBook, com.najackdo.server.domain.book.entity.QUserBook>createList("userBooks", com.najackdo.server.domain.book.entity.UserBook.class, com.najackdo.server.domain.book.entity.QUserBook.class, PathInits.DIRECT2);

    public final StringPath userName = createString("userName");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

