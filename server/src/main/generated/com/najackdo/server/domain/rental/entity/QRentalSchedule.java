package com.najackdo.server.domain.rental.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRentalSchedule is a Querydsl query type for RentalSchedule
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRentalSchedule extends EntityPathBase<RentalSchedule> {

    private static final long serialVersionUID = -905175457L;

    public static final QRentalSchedule rentalSchedule = new QRentalSchedule("rentalSchedule");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DatePath<java.sql.Date> pickupDate = createDate("pickupDate", java.sql.Date.class);

    public final StringPath pickupLocation = createString("pickupLocation");

    public final DatePath<java.sql.Date> returnDate = createDate("returnDate", java.sql.Date.class);

    public final StringPath returnLocation = createString("returnLocation");

    public QRentalSchedule(String variable) {
        super(RentalSchedule.class, forVariable(variable));
    }

    public QRentalSchedule(Path<? extends RentalSchedule> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRentalSchedule(PathMetadata metadata) {
        super(RentalSchedule.class, metadata);
    }

}

