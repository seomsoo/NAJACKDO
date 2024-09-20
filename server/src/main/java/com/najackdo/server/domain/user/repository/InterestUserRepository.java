package com.najackdo.server.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.user.entity.InterestUser;

public interface InterestUserRepository extends JpaRepository<InterestUser, Long> {
}
