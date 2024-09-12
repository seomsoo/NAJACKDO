package com.najackdo.server.core;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.domain.user.entity.User;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class UserTestController {
	@GetMapping("/api/v1/user-test")
	public String home(@CurrentUser User user) {
		return user.getNickName();
	}
}
