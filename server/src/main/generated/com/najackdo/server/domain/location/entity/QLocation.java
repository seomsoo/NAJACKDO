package com.najackdo.server.domain.location.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLocation is a Querydsl query type for Location
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLocation extends EntityPathBase<Location> {

    private static final long serialVersionUID = -1258246902L;

    public static final QLocation location = new QLocation("location");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath locationName = createString("locationName");

    public final ComparablePath<org.locationtech.jts.geom.Point> locationPoint = createComparable("locationPoint", org.locationtech.jts.geom.Point.class);

    public final ComparablePath<org.locationtech.jts.geom.MultiPolygon> locationPolygon = createComparable("locationPolygon", org.locationtech.jts.geom.MultiPolygon.class);

    public QLocation(String variable) {
        super(Location.class, forVariable(variable));
    }

    public QLocation(Path<? extends Location> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLocation(PathMetadata metadata) {
        super(Location.class, metadata);
    }

}

