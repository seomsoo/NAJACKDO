package com.najackdo.server.domain.book.dto;

import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

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
    @AllArgsConstructor
    public static class Create {
        @NotNull
        private User user;
        @NotNull
        private List<String> titles;
        @NotNull
        private int locationId;

        public static Create of(User user, List<String> titles, int locationId) {
            return new Create(user, titles, locationId);
        }
    }

}
