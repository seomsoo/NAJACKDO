package com.najackdo.server.domain.rental.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.rental.entity.Rental;

public interface RentalRepository extends JpaRepository<Rental, Long> {

	@Query("""

		SELECT r 
		FROM Rental r 
		LEFT JOIN FETCH r.cart
		LEFT JOIN FETCH r.cart.cartItems ci
		LEFT JOIN FETCH ci.userBookDetail
		LEFT JOIN FETCH ci.userBookDetail.userBook
		WHERE r.cart.id = :cartId
""")
	Optional<Rental> findByCartId(@Param("cartId") Long cartId);


	@Query("""
		SELECT r 
		FROM Rental r 
		JOIN FETCH r.cart
		JOIN FETCH r.cart.customer
		JOIN FETCH r.cart.cartItems ci
		JOIN FETCH ci.userBookDetail
		JOIN FETCH ci.userBookDetail.userBook
		JOIN FETCH ci.userBookDetail.userBook.book
		WHERE r.cart.owner.id = :id AND r.status != "READY"
		ORDER BY r.id DESC
""")
	List<Rental> findLendListByUserId(Long id);

	@Query("""
		SELECT r 
		FROM Rental r 
		JOIN FETCH r.cart
		JOIN FETCH r.cart.owner
		JOIN FETCH r.cart.cartItems ci
		JOIN FETCH ci.userBookDetail
		JOIN FETCH ci.userBookDetail.userBook
		JOIN FETCH ci.userBookDetail.userBook.book
		WHERE r.cart.customer.id = :id AND r.status != "READY"
		ORDER BY r.id DESC
""")
	List<Rental> findBorrowListByUserId(Long id);

	@Query("""
    SELECT b
    FROM Rental r
    JOIN r.cart c
    JOIN c.cartItems ci
    JOIN ci.userBookDetail ubd
    JOIN ubd.userBook ub
    JOIN ub.book b
  	WHERE r.rentalStartDate BETWEEN current_timestamp - 1 day AND current_timestamp + 1 day 
    GROUP BY b
    ORDER BY COUNT(r) DESC
    LIMIT 5
""")
	List<Book> findBestSeller();



	@Query("""
    SELECT ci.userBookDetail.userBook.book
    FROM Rental r
    JOIN r.cart c
    JOIN c.cartItems ci
    JOIN ci.userBookDetail ubd
    JOIN ubd.userBook ub
    JOIN ub.book b
    JOIN ub.locationCode lc
  	WHERE r.rentalStartDate BETWEEN current_timestamp - 1 day AND current_timestamp + 1 day 
  	AND lc.id = :locationCode
    GROUP BY b
    ORDER BY COUNT(r) DESC
    LIMIT 10
""")
	List<Book> findLocalBestSeller(Integer locationCode);

	@Query("""
		SELECT r FROM Rental r 
		LEFT JOIN FETCH r.rentalReview
		LEFT JOIN FETCH r.cart
		LEFT JOIN FETCH r.cart.customer
		LEFT JOIN FETCH r.cart.owner
		LEFT JOIN FETCH r.cart.chatRoom
		WHERE r.id = :rentalId
""")
	Optional<Rental> findRentalById(Long rentalId);

}
