package com.najackdo.server.domain.rental.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReviewItems is a Querydsl query type for ReviewItems
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReviewItems extends EntityPathBase<ReviewItems> {

    private static final long serialVersionUID = -1433012412L;

    public static final QReviewItems reviewItems = new QReviewItems("reviewItems");

    public final StringPath content = createString("content");

    public final NumberPath<Long> Id = createNumber("Id", Long.class);

    public final BooleanPath positive = createBoolean("positive");

    public QReviewItems(String variable) {
        super(ReviewItems.class, forVariable(variable));
    }

    public QReviewItems(Path<? extends ReviewItems> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReviewItems(PathMetadata metadata) {
        super(ReviewItems.class, metadata);
    }

}

