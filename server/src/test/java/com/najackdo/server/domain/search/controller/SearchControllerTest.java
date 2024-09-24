// package com.najackdo.server.domain.search.controller;
//
// import static com.epages.restdocs.apispec.ResourceDocumentation.*;
// import static org.mockito.ArgumentMatchers.*;
// import static org.mockito.Mockito.*;
// import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
// import static org.springframework.restdocs.payload.PayloadDocumentation.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
// import java.sql.Date;
// import java.time.LocalDate;
// import java.util.List;
//
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.context.annotation.ComponentScan;
// import org.springframework.context.annotation.FilterType;
// import org.springframework.restdocs.payload.JsonFieldType;
// import org.springframework.restdocs.snippet.Attributes;
// import org.springframework.security.test.context.support.WithMockUser;
// import org.springframework.test.web.servlet.ResultActions;
//
// import com.epages.restdocs.apispec.ResourceSnippetParameters;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.najackdo.server.core.configuration.SecurityConfig;
// import com.najackdo.server.core.filter.JWTFilter;
// import com.najackdo.server.core.support.RestDocsSupport;
// import com.najackdo.server.domain.book.dto.BookData;
// import com.najackdo.server.domain.book.entity.Book;
// import com.najackdo.server.domain.search.dto.AutocompleteResponse;
// import com.najackdo.server.domain.search.service.SearchService;
//
// @WebMvcTest(
// 	value = SearchController.class,
// 	excludeFilters = {
// 		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class),
// 		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JWTFilter.class),
// 	}
// )
// class SearchControllerTest extends RestDocsSupport {
//
// 	@MockBean
// 	private SearchService searchService;
//
// 	@Autowired
// 	private ObjectMapper objectMapper;
//
// 	@Test
// 	@DisplayName("검색 요청 성공")
// 	@WithMockUser(username = "test-user")
// 	void search() throws Exception {
// 		// GIVEN
// 		Book book = Book.createBook(
// 			1234567890L, // ID는 나중에 스파이를 통해 설정
// 			"Book",
// 			"genre",
// 			"Test Book",
// 			"Bum su",
// 			"image.png",
// 			Date.valueOf(LocalDate.now()),
// 			15000,
// 			320,
// 			5,
// 			"Publisher"
// 		);
//
// 		// Book 객체에 스파이를 사용
// 		Book spyBook = Mockito.spy(book);
//
// 		// bookId에 대해 가짜 ID 값 설정
// 		doReturn(1L).when(spyBook).getId();
//
// 		// 검색 결과로 스파이된 Book 사용
// 		List<BookData.Search> searchResults = List.of(
// 			BookData.Search.of(spyBook)
// 		);
// 		when(searchService.searchKeyword(anyLong(), anyString())).thenReturn(searchResults);
//
// 		// WHEN
// 		ResultActions perform = this.mockMvc.perform(get("/api/v1/search")
// 			.param("keyword", "test")
// 			.header("Authorization", "Bearer test-token"));
//
// 		// THEN
// 		perform.andExpect(status().isOk())
// 			.andExpect(jsonPath("$.data[0].bookId").value(1L))  // 스파이를 통해 설정된 ID 값 검증
// 			.andExpect(jsonPath("$.data[0].title").value("Test Book"))
// 			.andExpect(jsonPath("$.data[0].author").value("Bum su"))
// 			.andExpect(jsonPath("$.data[0].cover").value("image.png"))
// 			.andExpect(jsonPath("$.data[0].genre").value("genre"))
// 			.andExpect(jsonPath("$.data[0].description").value("Book"))
// 			.andExpect(jsonPath("$.data[0].publisher").value("Publisher"))
// 			.andExpect(jsonPath("$.data[0].priceStandard").value(15000))
// 			.andExpect(jsonPath("$.data[0].itemPage").value(320))
// 			.andExpect(jsonPath("$.data[0].starPoint").value(5))
// 			.andExpect(jsonPath("$.data[0].pubDate").value(LocalDate.now().toString()))
// 			.andExpect(jsonPath("$.data[0].isbn").value(1234567890))
// 			.andDo(restDocs.document(
// 				resource(
// 					ResourceSnippetParameters.builder()
// 						.tag("Search")
// 						.description("도서 검색 기능")
// 						.summary("키워드를 이용해 도서를 검색합니다.")
// 						.queryParameters(
// 							parameterWithName("keyword").description("검색할 키워드")
// 						)
// 						.responseFields(
// 							fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("요청 성공 여부"),
// 							fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
// 							fieldWithPath("message").type(JsonFieldType.STRING).description("상태 메시지"),
// 							fieldWithPath("data[].bookId").type(JsonFieldType.NUMBER).description("도서 ID"),
// 							fieldWithPath("data[].title").type(JsonFieldType.STRING).description("도서 제목"),
// 							fieldWithPath("data[].author").type(JsonFieldType.STRING).description("도서 저자"),
// 							fieldWithPath("data[].cover").type(JsonFieldType.STRING).description("도서 커버 이미지"),
// 							fieldWithPath("data[].genre").type(JsonFieldType.STRING).description("도서 장르"),
// 							fieldWithPath("data[].description").type(JsonFieldType.STRING).description("도서 설명"),
// 							fieldWithPath("data[].publisher").type(JsonFieldType.STRING).description("도서 출판사"),
// 							fieldWithPath("data[].priceStandard").type(JsonFieldType.NUMBER).description("도서 가격"),
// 							fieldWithPath("data[].itemPage").type(JsonFieldType.NUMBER).description("도서 페이지 수"),
// 							fieldWithPath("data[].starPoint").type(JsonFieldType.NUMBER).description("도서 평점"),
// 							fieldWithPath("data[].pubDate").type(JsonFieldType.STRING).description("도서 출판일"),
// 							fieldWithPath("data[].isbn").type(JsonFieldType.NUMBER).description("도서 ISBN")
// 						)
// 						.build()
// 				)
// 			));
// 	}
//
// 	@Test
// 	@DisplayName("최근 검색어 리스트 조회 성공")
// 	@WithMockUser(username = "test-user")
// 	void getRecentSearchList() throws Exception {
// 		// GIVEN
// 		List<String> recentSearchList = List.of("1분 전 검색어", "5분 전 검색어", "10분 전 검색어");
// 		when(searchService.getResentSearchList(anyLong())).thenReturn(recentSearchList);
//
// 		// WHEN
// 		ResultActions perform = this.mockMvc.perform(get("/api/v1/search/recent")
// 			.header("Authorization", "Bearer test-token"));
//
// 		// THEN
// 		perform.andExpect(status().isOk())
// 			.andExpect(jsonPath("$.data[0]").value("1분 전 검색어"))
// 			.andExpect(jsonPath("$.data[1]").value("5분 전 검색어"))
// 			.andExpect(jsonPath("$.data[2]").value("10분 전 검색어"))
// 			.andDo(restDocs.document(
// 				resource(
// 					ResourceSnippetParameters.builder()
// 						.tag("Search")
// 						.description("최근 검색어 리스트 조회")
// 						.summary("최근 검색어를 조회합니다.")
// 						.responseFields(
// 							fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("요청 성공 여부"),
// 							fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
// 							fieldWithPath("message").type(JsonFieldType.STRING).description("상태 메시지"),
// 							fieldWithPath("data[]").type(JsonFieldType.ARRAY).description("최근 검색어 목록")
// 								.attributes(new Attributes.Attribute("type", "string"))
// 						)
// 						.build()
// 				)
// 			));
// 	}
//
// 	@Test
// 	@DisplayName("인기 검색어 리스트 조회 성공")
// 	@WithMockUser(username = "test-user")
// 	void getPopularSearchList() throws Exception {
// 		// GIVEN
// 		List<String> popularKeywords = List.of("1등 인기책", "2등 인기책", "3등 인기책");
// 		when(searchService.getPopularKeywords()).thenReturn(popularKeywords);
//
// 		// WHEN
// 		ResultActions perform = this.mockMvc.perform(get("/api/v1/search/popularity")
// 			.header("Authorization", "Bearer test-token"));
//
// 		// THEN
// 		perform.andExpect(status().isOk())
// 			.andExpect(jsonPath("$.data[0]").value("1등 인기책"))
// 			.andExpect(jsonPath("$.data[1]").value("2등 인기책"))
// 			.andExpect(jsonPath("$.data[2]").value("3등 인기책"))
// 			.andDo(restDocs.document(
// 				resource(
// 					ResourceSnippetParameters.builder()
// 						.tag("Search")
// 						.description("인기 검색어 리스트 조회")
// 						.summary("인기 검색어를 조회합니다.")
// 						.responseFields(
// 							fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("요청 성공 여부"),
// 							fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
// 							fieldWithPath("message").type(JsonFieldType.STRING).description("상태 메시지"),
// 							fieldWithPath("data[]").type(JsonFieldType.ARRAY).description("인기 검색어 목록")
// 								.attributes(new Attributes.Attribute("type", "string"))
// 						)
// 						.build()
// 				)
// 			));
// 	}
//
// 	@Test
// 	@DisplayName("자동완성 검색어 조회 성공")
// 	void getAutoCompleteList() throws Exception {
// 		// GIVEN
// 		AutocompleteResponse autocompleteResponse = new AutocompleteResponse(
// 			List.of(new AutocompleteResponse.Data("싸피 교과서1", 2.0), new AutocompleteResponse.Data("싸피 교과서2", 1.0))
// 		);
// 		when(searchService.getAutocomplete(anyString())).thenReturn(autocompleteResponse);
//
// 		// WHEN
// 		ResultActions perform = this.mockMvc.perform(get("/api/v1/search/auto-complete")
// 			.param("keyword", "싸피"));
//
// 		// THEN
// 		perform.andExpect(status().isOk())
// 			.andExpect(jsonPath("$.list[0].value").value("싸피 교과서1"))
// 			.andDo(restDocs.document(
// 				resource(
// 					ResourceSnippetParameters.builder()
// 						.tag("Search")
// 						.description("자동완성 검색어 조회")
// 						.summary("자동완성 검색어를 조회합니다.")
// 						.queryParameters(
// 							parameterWithName("keyword").description("자동완성을 위한 검색 키워드")
// 						)
// 						.responseFields(
// 							fieldWithPath("list[].value").type(JsonFieldType.STRING).description("자동완성 결과"),
// 							fieldWithPath("list[].score").type(JsonFieldType.NUMBER).description("자동완성 점수")
// 						)
// 						.build()
// 				)
// 			));
// 	}
//
// }