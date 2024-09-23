package com.najackdo.server.core;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.core.service.S3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/images")
public class ImageTestController {

	private final S3Service s3Service;
	@PostMapping("/files")
	public SuccessResponse<List<String>> uploadImages(
		@RequestPart List<MultipartFile> multipartFile) {
		return SuccessResponse.of(s3Service.uploadImages(multipartFile));
	}
	@DeleteMapping("/files")
	public SuccessResponse<Void> deleteImages(@RequestParam List<String> fileNames) {
		s3Service.deleteImages(fileNames);
		return SuccessResponse.empty();
	}
}