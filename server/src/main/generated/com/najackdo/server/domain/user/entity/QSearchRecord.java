package com.najackdo.server.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSearchRecord is a Querydsl query type for SearchRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSearchRecord extends EntityPathBase<SearchRecord> {

    private static final long serialVersionUID = -881641084L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSearchRecord searchRecord = new QSearchRecord("searchRecord");

    public final com.najackdo.server.domain.book.entity.QBook book;

    public final NumberPath<Integer> clickCount = createNumber("clickCount", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QUser user;

    public QSearchRecord(String variable) {
        this(SearchRecord.class, forVariable(variable), INITS);
    }

    public QSearchRecord(Path<? extends SearchRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSearchRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSearchRecord(PathMetadata metadata, PathInits inits) {
        this(SearchRecord.class, metadata, inits);
    }

    public QSearchRecord(Class<? extends SearchRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new com.najackdo.server.domain.book.entity.QBook(forProperty("book")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

