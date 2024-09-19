package com.najackdo.server.domain.rental.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRentalReservation is a Querydsl query type for RentalReservation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRentalReservation extends EntityPathBase<RentalReservation> {

    private static final long serialVersionUID = 278577924L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRentalReservation rentalReservation = new QRentalReservation("rentalReservation");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> reservationDate = createDateTime("reservationDate", java.time.LocalDateTime.class);

    public final com.najackdo.server.domain.user.entity.QUser user;

    public final com.najackdo.server.domain.book.entity.QUserBook userBook;

    public QRentalReservation(String variable) {
        this(RentalReservation.class, forVariable(variable), INITS);
    }

    public QRentalReservation(Path<? extends RentalReservation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRentalReservation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRentalReservation(PathMetadata metadata, PathInits inits) {
        this(RentalReservation.class, metadata, inits);
    }

    public QRentalReservation(Class<? extends RentalReservation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.najackdo.server.domain.user.entity.QUser(forProperty("user"), inits.get("user")) : null;
        this.userBook = inits.isInitialized("userBook") ? new com.najackdo.server.domain.book.entity.QUserBook(forProperty("userBook"), inits.get("userBook")) : null;
    }

}

