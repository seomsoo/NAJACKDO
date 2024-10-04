package com.najackdo.server.domain.cart.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCart is a Querydsl query type for Cart
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCart extends EntityPathBase<Cart> {

    private static final long serialVersionUID = -1690785952L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCart cart = new QCart("cart");

    public final ListPath<CartItem, QCartItem> cartItems = this.<CartItem, QCartItem>createList("cartItems", CartItem.class, QCartItem.class, PathInits.DIRECT2);

    public final com.najackdo.server.domain.chat.entity.QChatRoom chatRoom;

    public final com.najackdo.server.domain.user.entity.QUser customer;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final com.najackdo.server.domain.user.entity.QUser owner;

    public final com.najackdo.server.domain.rental.entity.QRental rental;

    public final NumberPath<Integer> rentalPeriod = createNumber("rentalPeriod", Integer.class);

    public QCart(String variable) {
        this(Cart.class, forVariable(variable), INITS);
    }

    public QCart(Path<? extends Cart> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCart(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCart(PathMetadata metadata, PathInits inits) {
        this(Cart.class, metadata, inits);
    }

    public QCart(Class<? extends Cart> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new com.najackdo.server.domain.chat.entity.QChatRoom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.customer = inits.isInitialized("customer") ? new com.najackdo.server.domain.user.entity.QUser(forProperty("customer"), inits.get("customer")) : null;
        this.owner = inits.isInitialized("owner") ? new com.najackdo.server.domain.user.entity.QUser(forProperty("owner"), inits.get("owner")) : null;
        this.rental = inits.isInitialized("rental") ? new com.najackdo.server.domain.rental.entity.QRental(forProperty("rental"), inits.get("rental")) : null;
    }

}

