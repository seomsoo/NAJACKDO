package com.najackdo.server.core.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	// Common
	SERVER_ERROR(1000, HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러가 발생하였습니다."),
	INVALID_INPUT_VALUE(1001, HttpStatus.BAD_REQUEST, "유효하지 않은 입력 값입니다."),

	// Authentication, Authorization
	UNAUTHORIZED(2000, HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다."),
	INVALID_TOKEN(2002, HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),

	EXPIRED_TOKEN(2003, HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),

	EXPIRED_REFRESH_TOKEN(2005, HttpStatus.UNAUTHORIZED, "만료된 리프레시 토큰입니다."),
	NOT_FOUND_USER(2007, HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
	INVALID_ACCESS_TOKEN(2008, HttpStatus.UNAUTHORIZED, "유효하지 않은 액세스 토큰입니다."),
	ACCESS_DENIED(2010, HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),

	// KapayService 관련 에러
	KAKAO_PAY_API_ERROR(3000, HttpStatus.BAD_REQUEST, "카카오페이 API 요청 중 에러가 발생하였습니다."),
	MISSING_REQUIRED_PARAMETER(3001, HttpStatus.BAD_REQUEST, "필수 파라미터가 누락되었습니다."),
	INVALID_RESPONSE(3002, HttpStatus.BAD_REQUEST, "유효하지 않은 응답입니다."),
	APPROVAL_FAILURE(3003, HttpStatus.PAYMENT_REQUIRED, "결제 승인에 실패하였습니다."),

	// Survey
	NOT_FOUND_SURVEY_RESULT(4000, HttpStatus.NOT_FOUND, "없는 설문입니다."),

	// Chat
	CHATROOM_NOT_FOUND(5000, HttpStatus.NOT_FOUND, "채팅방을 찾을 수 없습니다."),
	CHATROOM_ALREADY_EXIST(5001, HttpStatus.BAD_REQUEST, "이미 존재하는 채팅방입니다."),
	ALREADY_ENTERED_ROOM(5002, HttpStatus.BAD_REQUEST, "이미 참여한 방입니다."),
	CHATROOM_MEMBER_NOT_FOUND(5003, HttpStatus.NOT_FOUND, "채팅방 멤버를 찾을 수 없습니다."),

	// Location
	NOT_FOUND_LOCATION(6000, HttpStatus.NOT_FOUND, "위치를 찾을 수 없습니다."),
	ACTIVITY_AREA_NOT_FOUND(6001, HttpStatus.NOT_FOUND, "활동지역을 찾을 수 없습니다."),

	// BOOK
	BOOK_NOT_FOUND(7000, HttpStatus.NOT_FOUND, "책을 찾을 수 없습니다."),
	BOOK_ALREADY_EXIST(7001, HttpStatus.BAD_REQUEST, "이미 존재하는 책입니다."),

	BOOKMARK_ALREADY_EXIST(7002, HttpStatus.BAD_REQUEST, "이미 존재하는 북마크입니다."),
	BOOKMARK_NOT_FOUND(7003, HttpStatus.NOT_FOUND, "북마크를 찾을 수 없습니다."),

	// S3
	EMPTY_FILE(8000, HttpStatus.BAD_REQUEST, "파일이 비어있습니다."),
	FAIL_TO_DELETE_FILE(8001, HttpStatus.INTERNAL_SERVER_ERROR, "파일 삭제에 실패하였습니다."),
	NOT_SUPPORTED_EXTENTION(8002, HttpStatus.BAD_REQUEST, "지원하지 않는 확장자입니다."),
	FAIL_TO_CREATE_FILE(8003, HttpStatus.INTERNAL_SERVER_ERROR, "파일 생성에 실패하였습니다."),

	//USER
	INTERESTUSER_ALREADY_EXIST(9000, HttpStatus.BAD_REQUEST, "이미 존재하는 관심 유저입니다."),
	INVALID_FOLLOW_BY_MYSELF(9001, HttpStatus.BAD_REQUEST, "자신을 팔로우할 수 없습니다."),

	//ALARM
	NOT_SENDED_ALARM(9100, HttpStatus.INTERNAL_SERVER_ERROR, "알람 송신에 실패하였습니다"),
	NO_HAD_FCMTOKEN(9101, HttpStatus.BAD_REQUEST, "해당 유저의 FCM 토큰 값이 존재하지 않습니다."),

	// RENTAL
	NOT_FOUND_CART(10000, HttpStatus.NOT_FOUND, "해당 장바구니가 존재하지 않습니다."),
	RENTAL_CART_ALREADY_RENTED(10000, HttpStatus.BAD_REQUEST, "이미 대여된 장바구니입니다."),
	NOT_ENOUGH_CASH(10001, HttpStatus.BAD_REQUEST, "잔액이 부족합니다."),
	NOT_FOUND_RENTAL(10002, HttpStatus.NOT_FOUND, "대여 정보를 찾을 수 없습니다."),
	// 잘못된 반납 요청

	// CART_ITEM
	NOT_FOUND_CART_ITEM(11000, HttpStatus.NOT_FOUND, "해당 장바구니 아이템이 존재하지 않습니다."),
	NOT_YOUR_CART_ITEM(11001, HttpStatus.BAD_REQUEST, "내 장바구니 아이템이 아닙니다."),
	ALREADY_EXIST_CART_ITEM(11002, HttpStatus.BAD_REQUEST, "이미 존재하는 장바구니 아이템입니다."),

	// USER_BOOK
	NOT_FOUND_USER_BOOK(12000, HttpStatus.NOT_FOUND, "해당 유저 책이 존재하지 않습니다."),
	NOT_FOUND_USER_BOOK_DETAIL(12001, HttpStatus.NOT_FOUND, "해당 유저 책 상세 정보가 존재하지 않습니다."),
	NOT_ADD_MY_BOOK_TO_CART(12002, HttpStatus.BAD_REQUEST, "자신의 책을 장바구니에 담을 수 없습니다."),
	NOT_FOUND_BOOK(12003, HttpStatus.NOT_FOUND, "책을 찾을 수 없습니다."),
	BOOK_DETAIL_NOT_FOUND(12004, HttpStatus.NOT_FOUND, "책 상세 정보를 찾을 수 없습니다."),

	//REVIEW
	NOT_FOUND_RENTAL_REVIEW(13000, HttpStatus.NOT_FOUND, "대여 리뷰를 찾을 수 없습니다."),


	// RECOMMEND
	NESSARY_BOOKMARK(14000, HttpStatus.BAD_REQUEST, "북마크가 필요합니다.");


	private final int code;
	private final HttpStatus status;
	private final String message;
}
