package com.najackdo.server.core.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	// Common
	SERVER_ERROR(1000, HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러가 발생하였습니다."),

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

	// S3
	EMPTY_FILE(8000, HttpStatus.BAD_REQUEST, "파일이 비어있습니다."),
	FAIL_TO_DELETE_FILE(8001, HttpStatus.INTERNAL_SERVER_ERROR, "파일 삭제에 실패하였습니다."),
	NOT_SUPPORTED_EXTENTION(8002, HttpStatus.BAD_REQUEST, "지원하지 않는 확장자입니다."),
	FAIL_TO_CREATE_FILE(8003, HttpStatus.INTERNAL_SERVER_ERROR, "파일 생성에 실패하였습니다.");

	private final int code;
	private final HttpStatus status;
	private final String message;
}
