package com.najackdo.server.domain.kapay.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.domain.kapay.dto.ReadyResponse;
import com.najackdo.server.domain.kapay.service.KapayService;

import lombok.RequiredArgsConstructor;

/**
 * Controller for handling Kakao Pay related actions.
 * Created by kakaopay.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/kapay")
public class KapayController {

	private final KapayService kapayService;

	@GetMapping("/ready/{agent}/{openType}")
	public String ready(
		@PathVariable("agent") String agent,
		@PathVariable("openType") String openType,
		Model model
	) {
		System.out.println("agent = " + agent);
		System.out.println("openType = " + openType);

		ReadyResponse readyResponse = kapayService.ready(agent, openType);

		if ("mobile".equals(agent)) {

			return "redirect:" + readyResponse.getNext_redirect_mobile_url();
		}

		if ("app".equals(agent)) {
			model.addAttribute("webviewUrl", "app://webview?url=" + readyResponse.getNext_redirect_app_url());
			return "app/webview/ready";
		}

		model.addAttribute("response", readyResponse);
		return String.format("%s/%s/ready", agent, openType);
	}

	@GetMapping("/approve/{agent}/{openType}")
	public String approve(
		@PathVariable("agent") String agent,
		@PathVariable("openType") String openType,
		@RequestParam("pg_token") String pgToken,
		Model model
	) {
		String approveResponse = String.valueOf(kapayService.approve(pgToken));
		System.out.println("approveResponse = " + approveResponse);
		model.addAttribute("response", approveResponse);
		return String.format("%s/%s/approve", agent, openType);
	}

	@GetMapping("/cancel/{agent}/{openType}")
	public String cancel(
		@PathVariable("agent") String agent,
		@PathVariable("openType") String openType
	) {
		// Confirm if the order is truly canceled by checking the status with the “show payment status” API.
		return String.format("%s/%s/cancel", agent, openType);
	}

	@GetMapping("/fail/{agent}/{openType}")
	public String fail(
		@PathVariable("agent") String agent,
		@PathVariable("openType") String openType
	) {
		// Confirm if the order has truly failed by checking the status with the “show payment status” API.
		return String.format("%s/%s/fail", agent, openType);
	}
}
