package com.najackdo.server.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1940316214L;

    public static final QUser user = new QUser("user");

    public final com.najackdo.server.core.entity.QBaseEntity _super = new com.najackdo.server.core.entity.QBaseEntity(this);

    public final NumberPath<Short> age = createNumber("age", Short.class);

    public final NumberPath<Integer> cash = createNumber("cash", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath email = createString("email");

    public final StringPath fcmToken = createString("fcmToken");

    public final ComparablePath<Character> gender = createComparable("gender", Character.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final NumberPath<Integer> mannerScore = createNumber("mannerScore", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath nickName = createString("nickName");

    public final StringPath profileImage = createString("profileImage");

    public final StringPath providerId = createString("providerId");

    public final EnumPath<ProviderType> providerType = createEnum("providerType", ProviderType.class);

    public final EnumPath<RoleType> roleType = createEnum("roleType", RoleType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final StringPath username = createString("username");

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

