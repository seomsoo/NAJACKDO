package com.najackdo.server.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInterestUser is a Querydsl query type for InterestUser
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterestUser extends EntityPathBase<InterestUser> {

    private static final long serialVersionUID = 86162304L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInterestUser interestUser = new QInterestUser("interestUser");

    public final QUser follower;

    public final QUser following;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QInterestUser(String variable) {
        this(InterestUser.class, forVariable(variable), INITS);
    }

    public QInterestUser(Path<? extends InterestUser> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInterestUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInterestUser(PathMetadata metadata, PathInits inits) {
        this(InterestUser.class, metadata, inits);
    }

    public QInterestUser(Class<? extends InterestUser> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.follower = inits.isInitialized("follower") ? new QUser(forProperty("follower"), inits.get("follower")) : null;
        this.following = inits.isInitialized("following") ? new QUser(forProperty("following"), inits.get("following")) : null;
    }

}

