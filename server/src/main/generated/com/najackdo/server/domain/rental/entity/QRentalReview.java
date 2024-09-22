package com.najackdo.server.domain.rental.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRentalReview is a Querydsl query type for RentalReview
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRentalReview extends EntityPathBase<RentalReview> {

    private static final long serialVersionUID = -1913334496L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRentalReview rentalReview = new QRentalReview("rentalReview");

    public final com.najackdo.server.core.entity.QTimeEntity _super = new com.najackdo.server.core.entity.QTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QRental rental;

    public final QReviewItems reviewItems;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.najackdo.server.domain.user.entity.QUser user;

    public QRentalReview(String variable) {
        this(RentalReview.class, forVariable(variable), INITS);
    }

    public QRentalReview(Path<? extends RentalReview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRentalReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRentalReview(PathMetadata metadata, PathInits inits) {
        this(RentalReview.class, metadata, inits);
    }

    public QRentalReview(Class<? extends RentalReview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.rental = inits.isInitialized("rental") ? new QRental(forProperty("rental"), inits.get("rental")) : null;
        this.reviewItems = inits.isInitialized("reviewItems") ? new QReviewItems(forProperty("reviewItems")) : null;
        this.user = inits.isInitialized("user") ? new com.najackdo.server.domain.user.entity.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

