// package com.najackdo.server.domain.user.controller;
//
// import static com.epages.restdocs.apispec.ResourceDocumentation.*;
// import static org.mockito.ArgumentMatchers.*;
// import static org.mockito.Mockito.*;
// import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
// import static org.springframework.restdocs.payload.PayloadDocumentation.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
// import java.util.List;
//
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.context.annotation.ComponentScan;
// import org.springframework.context.annotation.FilterType;
// import org.springframework.restdocs.payload.JsonFieldType;
// import org.springframework.security.test.context.support.WithMockUser;
// import org.springframework.test.web.servlet.ResultActions;
//
// import com.epages.restdocs.apispec.ResourceSnippetParameters;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.najackdo.server.core.configuration.SecurityConfig;
// import com.najackdo.server.core.filter.JWTFilter;
// import com.najackdo.server.core.support.RestDocsSupport;
// import com.najackdo.server.domain.user.dto.UserData;
// import com.najackdo.server.domain.user.entity.User;
// import com.najackdo.server.domain.user.service.UserService;
//
// @WebMvcTest(
// 	value = UserController.class,
// 	excludeFilters = {
// 		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class),
// 		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JWTFilter.class),
// 	}
// )
// class UserControllerTest extends RestDocsSupport {
//
// 	@MockBean
// 	private UserService userService;
//
// 	@Autowired
// 	private ObjectMapper jacksonObjectMapper;
//
// 	@Test
// 	@DisplayName("정상적인 유저 정보 입력 요청")
// 	@WithMockUser(username = "test-user")
// 	void updateUserInfo() throws Exception {
// 		// GIVEN
// 		UserData.Update update = new UserData.Update();
// 		update.setNickname("JohnDoe");
// 		update.setGender('M');
// 		update.setAge("20대");
// 		update.setInterest(List.of(1L, 2L, 3L));
//
// 		// WHEN
// 		ResultActions perform = this.mockMvc.perform(post("/api/v1/user/info")
// 			.contentType("application/json")
// 			.content(jacksonObjectMapper.writeValueAsString(update)));
//
// 		// THEN
// 		perform.andExpect(status().isOk())
// 			.andDo(restDocs.document(
// 				resource(
// 					ResourceSnippetParameters.builder()
// 						.tag("User")
// 						.description("첫 로그인 후 유저 정보 입력")
// 						.summary("유저 정보를 업데이트합니다.")
// 						.requestFields(
// 							fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
// 							fieldWithPath("gender").type(JsonFieldType.STRING).description("성별"),
// 							fieldWithPath("age").type(JsonFieldType.NUMBER).description("나이"),
// 							fieldWithPath("interest[]").type(JsonFieldType.ARRAY).description("관심 분야 리스트")
// 						)
// 						.responseFields(
// 							fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("응답 성공 여부"),
// 							fieldWithPath("status").type(JsonFieldType.NUMBER).description("HTTP 상태 코드"),
// 							fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
// 							fieldWithPath("data").type(JsonFieldType.NULL).description("응답 데이터")
// 						)
// 						.build()
// 				)
// 			));
// 		verify(userService).updateUser(any(User.class), any(UserData.Update.class));
// 	}
//
// }
