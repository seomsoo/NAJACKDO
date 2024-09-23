package com.najackdo.server.core.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

	public static final String EXTENSION_DELIMITER = ".";
	private static List<String> ALLOWED_FILE_EXTENSIONS = List.of(".jpg", ".png", ".jpeg");



	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.cloudFrontDomain}")
	private String cloudFrontDomain;

	public List<String> uploadImages(final List<MultipartFile> multipartFiles) {
		List<String> fileNameList = new ArrayList<>();

		multipartFiles.forEach(file -> {
			final String fileExtension = extractFileExtension(file);

			String newFileName = UUID.randomUUID().toString().concat(fileExtension); // 파일명 난수화
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentLength(file.getSize());
			objectMetadata.setContentType(file.getContentType());

			try (InputStream inputStream = file.getInputStream()) {
				amazonS3.putObject(new PutObjectRequest(bucket, newFileName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead))   ;//public read 권한으로 업로드
			} catch (IOException e) {
				throw new BaseException(ErrorCode.FAIL_TO_CREATE_FILE);
			}
			fileNameList.add(newFileName);
		});

		return fileNameList;
	}


	private String extractFileExtension(MultipartFile file) {
		final String originalFileName = file.getOriginalFilename();
		final int extensionIndex = Objects.requireNonNull(originalFileName)
			.lastIndexOf(EXTENSION_DELIMITER);
		if (extensionIndex == -1 || !ALLOWED_FILE_EXTENSIONS.contains(
			originalFileName.substring(extensionIndex))) {
			throw new BaseException(ErrorCode.NOT_SUPPORTED_EXTENTION);
		}
		return originalFileName.substring(extensionIndex);
	}

	public void deleteImages(final List<String> fileNames) {
		fileNames.forEach((fileName) ->
			amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName)));
	}


}