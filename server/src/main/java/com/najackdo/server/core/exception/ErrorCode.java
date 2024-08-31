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
	ACCESS_DENIED(2010, HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");

	// Invalid Value



	private final int code;
	private final HttpStatus status;
	private final String message;
}
