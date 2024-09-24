package com.najackdo.server.domain.rental.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.rental.dto.RentalData;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RentalService {

	public void rental(User customer, RentalData.RentalRequest rentalRequest) {
		
	}
}
