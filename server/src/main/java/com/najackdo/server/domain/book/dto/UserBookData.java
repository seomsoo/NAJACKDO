package com.najackdo.server.domain.book.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.entity.UserBookDetail;
import com.najackdo.server.domain.user.entity.User;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class UserBookData {

	@Data
	public static class Search {
		private String title;

		public static Search of(UserBook book) {
			Search search = new Search();
			search.setTitle(book.getBook().getTitle());
			return search;
		}
	}

	@Data
	public static class Create {

		private MultipartFile file;

		public static Create of(MultipartFile file) {
			Create create = new Create();
			create.file = file;
			return create;
		}

	}

	@Data
	public static class CreateByISBN {

		@NotNull
		private Long ISBN;
	}

	@Data
	public static class CreateByIds {
		private List<Long> bookIds;
	}

	@Data
	public static class BookCase {
		private long userBookId;
		private String cover;
		private String title;
		private String author;
		private String description;
	}

	@Data
	public static class InfoResponse {
		// * User
		private Long ownerId;
		private String nickname;
		private String profileImage;
		private Integer mannerScore;
		// *
		private String locationName;
		// * Book
		private String bookTitle;
		private String bookAuthor;
		private String bookCover;
		private String genre;
		private String bookDescription;
		// * UserBook
		private Long userBookId;
		private String bookStatus;
		// * UserBookDetail
		private Integer ondayPrice;
		private String backImagePath;
		private String frontImagePath;
		private String inspectFrontImagePath;
		private String inspectBackImagePath;
		private Integer usedPrice;
		private Integer ripped;
		private Integer wornout;

		public static InfoResponse of(
			User user,
			String locationName,
			Book book,
			UserBook userBook,
			UserBookDetail userBookDetail) {
			InfoResponse response = new InfoResponse();
			response.ownerId = user.getId();
			response.nickname = user.getNickName();
			response.profileImage = user.getProfileImage();
			response.mannerScore = user.getMannerScore();
			response.locationName = locationName;
			response.bookTitle = book.getTitle();
			response.bookAuthor = book.getAuthor();
			response.bookCover = book.getCover();
			response.genre = book.getGenre();
			response.bookDescription = book.getDescription();
			response.userBookId = userBook.getId();
			response.bookStatus = userBook.getBookStatus().name();
			response.ondayPrice = userBookDetail.getOnedayPrice();
			response.frontImagePath = userBookDetail.getFrontImagePath();
			response.backImagePath = userBookDetail.getBackImagePath();
			response.inspectFrontImagePath = userBookDetail.getInspectFrontImagePath();
			response.inspectBackImagePath = userBookDetail.getInspectBackImagePath();
			response.usedPrice = userBookDetail.getUsedPrice();
			response.ripped = userBookDetail.getRipped();
			response.wornout = userBookDetail.getWornout();
			return response;
		}
	}

	@Data
	public static class UpdateRentalCost {
		private Long userBookId;
		private Integer updateRentalCost;
	}

	@Data
	public static class AvailableNearBook {
		private Long userBookId;
		private String imagePath;
		private Integer OneDayPrice;
		private String bookStatus;

		public static AvailableNearBook create(Long userBookId, String imagePath, Integer OneDayPrice,
			String bookStatus) {
			AvailableNearBook availableNearBook = new AvailableNearBook();
			availableNearBook.userBookId = userBookId;
			availableNearBook.imagePath = imagePath;
			availableNearBook.OneDayPrice = OneDayPrice;
			availableNearBook.bookStatus = bookStatus;
			return availableNearBook;
		}
	}

}
