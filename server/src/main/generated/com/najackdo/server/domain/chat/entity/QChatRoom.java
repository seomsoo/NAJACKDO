package com.najackdo.server.domain.chat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatRoom is a Querydsl query type for ChatRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatRoom extends EntityPathBase<ChatRoom> {

    private static final long serialVersionUID = 1564397771L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatRoom chatRoom = new QChatRoom("chatRoom");

    public final com.najackdo.server.domain.cart.entity.QCart cart;

    public final com.najackdo.server.domain.user.entity.QUser customer;

    public final com.najackdo.server.domain.user.entity.QUser owner;

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public QChatRoom(String variable) {
        this(ChatRoom.class, forVariable(variable), INITS);
    }

    public QChatRoom(Path<? extends ChatRoom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatRoom(PathMetadata metadata, PathInits inits) {
        this(ChatRoom.class, metadata, inits);
    }

    public QChatRoom(Class<? extends ChatRoom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.cart = inits.isInitialized("cart") ? new com.najackdo.server.domain.cart.entity.QCart(forProperty("cart"), inits.get("cart")) : null;
        this.customer = inits.isInitialized("customer") ? new com.najackdo.server.domain.user.entity.QUser(forProperty("customer"), inits.get("customer")) : null;
        this.owner = inits.isInitialized("owner") ? new com.najackdo.server.domain.user.entity.QUser(forProperty("owner"), inits.get("owner")) : null;
    }

}

