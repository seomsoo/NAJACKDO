package com.najackdo.server.domain.location.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.location.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Integer>, LocationQueryRepository { }
