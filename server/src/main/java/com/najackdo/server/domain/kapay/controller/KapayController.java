package com.najackdo.server.domain.kapay.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.kapay.dto.ReadyResponse;
import com.najackdo.server.domain.kapay.service.KapayService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/kapay")
public class KapayController {

	private final KapayService kapayService;

	@GetMapping("/ready/{agent}/{openType}")
	public SuccessResponse<String> ready(
		@PathVariable String agent,
		@PathVariable String openType
	) {
		ReadyResponse readyResponse = kapayService.ready(agent, openType);
		System.out.println("readyResponse = " + readyResponse);
		String redirectUrl = getRedirectUrl(agent, openType, readyResponse);

		return SuccessResponse.of(redirectUrl);
	}

	@GetMapping("/approve/{agent}/{openType}")
	public SuccessResponse<String> approve(
		@PathVariable String agent,
		@PathVariable String openType,
		@RequestParam("pg_token") String pgToken
	) {
		String approveResponse = kapayService.approve(pgToken).toString();
		return SuccessResponse.of(approveResponse);
	}

	@GetMapping("/cancel/{agent}/{openType}")
	public SuccessResponse<String> cancel(
		@PathVariable String agent,
		@PathVariable String openType
	) {
		return SuccessResponse.of(String.format("%s/%s/cancel", agent, openType));
	}

	@GetMapping("/fail/{agent}/{openType}")
	public SuccessResponse<String> fail(
		@PathVariable String agent,
		@PathVariable String openType
	) {
		return SuccessResponse.of(String.format("%s/%s/fail", agent, openType));
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
