package com.najackdo.server.domain.book.repository;

import java.util.List;

import com.najackdo.server.domain.book.entity.Book;

public interface BookQueryRepository {

	List<Book> findInterestingBooks(Long userId);

}
