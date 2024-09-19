package com.najackdo.server.domain.location.repository;

import com.najackdo.server.domain.location.entity.Location;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LocationRepository extends JpaRepository<Location,Integer>, LocationQueryRepository {

    @Query("SELECT l FROM Location l WHERE l.id = :locationId ")
    Location findById(@Param("locationId") int locationId);
}
