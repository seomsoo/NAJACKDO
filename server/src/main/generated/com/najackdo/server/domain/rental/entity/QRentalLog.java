package com.najackdo.server.domain.rental.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRentalLog is a Querydsl query type for RentalLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRentalLog extends EntityPathBase<RentalLog> {

    private static final long serialVersionUID = 2130041468L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRentalLog rentalLog = new QRentalLog("rentalLog");

    public final com.najackdo.server.core.entity.QTimeEntity _super = new com.najackdo.server.core.entity.QTimeEntity(this);

    public final QRental bookRental;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.najackdo.server.domain.book.entity.QUserBook userBook;

    public QRentalLog(String variable) {
        this(RentalLog.class, forVariable(variable), INITS);
    }

    public QRentalLog(Path<? extends RentalLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRentalLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRentalLog(PathMetadata metadata, PathInits inits) {
        this(RentalLog.class, metadata, inits);
    }

    public QRentalLog(Class<? extends RentalLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bookRental = inits.isInitialized("bookRental") ? new QRental(forProperty("bookRental"), inits.get("bookRental")) : null;
        this.userBook = inits.isInitialized("userBook") ? new com.najackdo.server.domain.book.entity.QUserBook(forProperty("userBook"), inits.get("userBook")) : null;
    }

}

