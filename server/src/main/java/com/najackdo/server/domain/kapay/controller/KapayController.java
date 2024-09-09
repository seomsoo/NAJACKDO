package com.najackdo.server.domain.kapay.controller;

import static com.najackdo.server.domain.user.entity.CashLogType.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.kapay.dto.ReadyResponse;
import com.najackdo.server.domain.kapay.service.KapayService;
import com.najackdo.server.domain.user.entity.CashLogType;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.event.CashEvent;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/kapay")
public class KapayController {

	private final KapayService kapayService;

	@GetMapping("/ready/{agent}/{openType}")
	public SuccessResponse<String> ready(
		@PathVariable String agent,
		@PathVariable String openType,
		@RequestParam("itemName") String itemName,
		@RequestParam("totalAmount") Integer totalAmount
	) {
		System.out.println("ready");
		ReadyResponse readyResponse = kapayService.ready(agent, openType, itemName, totalAmount);
		System.out.println("readyResponse = " + readyResponse);
		String redirectUrl = getRedirectUrl(agent, openType, readyResponse);

		return SuccessResponse.of(redirectUrl);
	}

	@GetMapping("/approve/{agent}/{openType}")
	public RedirectView approve(
		@CurrentUser User user,
		@PathVariable String agent,
		@PathVariable String openType,
		@RequestParam("pg_token") String pgToken,
		HttpServletResponse response
	) {

		ResponseEntity<?> approveResponseEntity = kapayService.approve(pgToken);
		HttpStatus statusCode = (HttpStatus)approveResponseEntity.getStatusCode();

		boolean isSuccess = statusCode == HttpStatus.OK;

		if (isSuccess) {
			CashLogType logType = PAYMENT;
			CashEvent cashEvent = new CashEvent(user, 1000, logType);

			return new RedirectView("http://localhost:3000/kapay/approve");
		} else {
			return new RedirectView("http://localhost:3000/kapay/fail");
		}
	}

	@GetMapping("/cancel/{agent}/{openType}")
	public RedirectView cancel(
		@PathVariable String agent,
		@PathVariable String openType
	) {
		System.out.println("cancel");

		String redirectUrl = "http://localhost:3000/kapay/cancel";

		return new RedirectView(redirectUrl);
	}

	@GetMapping("/fail/{agent}/{openType}")
	public RedirectView fail(
		@PathVariable String agent,
		@PathVariable String openType
	) {
		System.out.println("fail");
		return new RedirectView("http://localhost:3000/kapay/fail");
	}

	private String getRedirectUrl(String agent, String openType, ReadyResponse readyResponse) {
		switch (agent) {
			case "mobile":
				return readyResponse.getNext_redirect_mobile_url();
			case "app":
				return "app://webview?url=" + readyResponse.getNext_redirect_app_url();
			default:
				return readyResponse.getNext_redirect_pc_url();
		}
	}
}
