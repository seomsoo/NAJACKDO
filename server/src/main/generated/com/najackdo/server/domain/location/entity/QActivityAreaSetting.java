package com.najackdo.server.domain.location.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QActivityAreaSetting is a Querydsl query type for ActivityAreaSetting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QActivityAreaSetting extends EntityPathBase<ActivityAreaSetting> {

    private static final long serialVersionUID = -604582401L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QActivityAreaSetting activityAreaSetting = new QActivityAreaSetting("activityAreaSetting");

    public final com.najackdo.server.core.entity.QTimeEntity _super = new com.najackdo.server.core.entity.QTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Double> distanceMeters = createNumber("distanceMeters", Double.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QLocation location;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.najackdo.server.domain.user.entity.QUser user;

    public QActivityAreaSetting(String variable) {
        this(ActivityAreaSetting.class, forVariable(variable), INITS);
    }

    public QActivityAreaSetting(Path<? extends ActivityAreaSetting> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QActivityAreaSetting(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QActivityAreaSetting(PathMetadata metadata, PathInits inits) {
        this(ActivityAreaSetting.class, metadata, inits);
    }

    public QActivityAreaSetting(Class<? extends ActivityAreaSetting> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.location = inits.isInitialized("location") ? new QLocation(forProperty("location")) : null;
        this.user = inits.isInitialized("user") ? new com.najackdo.server.domain.user.entity.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

