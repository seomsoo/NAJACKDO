package com.najackdo.server.domain.location.repository;

import static com.najackdo.server.domain.location.entity.QLocation.*;

import java.util.List;

import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.location.entity.Location;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LocationQueryRepositoryImpl implements LocationQueryRepository {

	private final JPAQueryFactory queryFactory;
	private final EntityManager entityManager;


	/**
	 * 특정 좌표(Point)를 기준으로 가까운 location을 거리순으로 반환하는 쿼리
	 */
	/**
	 * 특정 좌표(Point)를 기준으로 가까운 location을 거리순으로 반환하는 쿼리
	 */
	@Override
	public Page<Location> findLocationsByDistance(Point point, Pageable pageable) {
		List<Location> content = queryFactory
			.select(location)
			.from(location)
			.where(Expressions.numberTemplate(Double.class,
				"ST_Distance({0}, {1})",
				location.locationPoint,
				point).isNotNull())
			.orderBy(Expressions.numberTemplate(Double.class,
				"ST_Distance({0}, {1})",
				location.locationPoint,
				point).asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		long total = queryFactory
			.select(location)
			.from(location)
			.where(Expressions.numberTemplate(Double.class,
				"ST_Distance({0}, {1})",
				location.locationPoint,
				point).isNotNull())
			.fetchCount();

		return new PageImpl<>(content, pageable, total);
	}


	@Override
	public Location findClosestLocation(@Param("point") Point point) {
		String nativeQuery = "SELECT * FROM location l ORDER BY ST_DistanceSphere(l.location_point, :point) ASC LIMIT 1";

		Query query = entityManager.createNativeQuery(nativeQuery, Location.class);
		query.setParameter("point", point);

		return (Location) query.getSingleResult();
	}


	/**
	 * 특정 좌표(Point)를 기준으로 가까운 location을 거리순으로 반환하는 쿼리 (페이징 처리 없음)
	 */
	@Override
	public List<Location> findLocationsWithPoligonByDistance(Point point, Double distance) {
		return queryFactory
			.select(location)
			.from(location)
			.where(
				Expressions.booleanTemplate(
					"ST_DWithin({0}, {1}, {2})",
					location.locationPoint,
					point,
					distance
				).isTrue()  // Ensure boolean expression is correctly used
			)
			.orderBy(
				Expressions.numberTemplate(Double.class,
					"ST_DistanceSphere({0}, {1})",
					location.locationPoint,
					point).asc()
			)
			.fetch();
	}


}
