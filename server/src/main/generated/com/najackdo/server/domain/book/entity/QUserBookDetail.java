package com.najackdo.server.domain.book.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserBookDetail is a Querydsl query type for UserBookDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserBookDetail extends EntityPathBase<UserBookDetail> {

    private static final long serialVersionUID = -1561976306L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserBookDetail userBookDetail = new QUserBookDetail("userBookDetail");

    public final StringPath backImagePath = createString("backImagePath");

    public final StringPath frontImagePath = createString("frontImagePath");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath inspectBackImagePath = createString("inspectBackImagePath");

    public final StringPath inspectFrontImagePath = createString("inspectFrontImagePath");

    public final NumberPath<Integer> onedayPrice = createNumber("onedayPrice", Integer.class);

    public final NumberPath<Integer> ripped = createNumber("ripped", Integer.class);

    public final NumberPath<Integer> usedPrice = createNumber("usedPrice", Integer.class);

    public final QUserBook userBook;

    public final NumberPath<Integer> wornout = createNumber("wornout", Integer.class);

    public QUserBookDetail(String variable) {
        this(UserBookDetail.class, forVariable(variable), INITS);
    }

    public QUserBookDetail(Path<? extends UserBookDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserBookDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserBookDetail(PathMetadata metadata, PathInits inits) {
        this(UserBookDetail.class, metadata, inits);
    }

    public QUserBookDetail(Class<? extends UserBookDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userBook = inits.isInitialized("userBook") ? new QUserBook(forProperty("userBook"), inits.get("userBook")) : null;
    }

}

