package com.najackdo.server.domain.book.dto;

import java.util.List;

import com.najackdo.server.domain.book.entity.UserBook;

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

		@NotNull
		private List<String> titles;

        public static Create of(List<String> titles) {
            Create create = new Create();
            create.titles = titles;
            return create;
        }

    }

    @Data
    public static class CreateByISBN {
        @NotNull
        private Long ISBN;
    }

	@Data
	public static class BookCase {
		private long userBookId;
		private String cover;
		private String title;
		private String author;
		private String description;
	}
}
