package com.najackdo.server.domain.book.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBook is a Querydsl query type for Book
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBook extends EntityPathBase<Book> {

    private static final long serialVersionUID = -1687043726L;

    public static final QBook book = new QBook("book");

    public final StringPath author = createString("author");

    public final StringPath cover = createString("cover");

    public final StringPath description = createString("description");

    public final StringPath genre = createString("genre");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> isbn = createNumber("isbn", Long.class);

    public final NumberPath<Integer> itemPage = createNumber("itemPage", Integer.class);

    public final NumberPath<Integer> priceStandard = createNumber("priceStandard", Integer.class);

    public final DatePath<java.sql.Date> pubDate = createDate("pubDate", java.sql.Date.class);

    public final StringPath publisher = createString("publisher");

    public final NumberPath<Integer> starPoint = createNumber("starPoint", Integer.class);

    public final StringPath title = createString("title");

    public QBook(String variable) {
        super(Book.class, forVariable(variable));
    }

    public QBook(Path<? extends Book> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBook(PathMetadata metadata) {
        super(Book.class, metadata);
    }

}

