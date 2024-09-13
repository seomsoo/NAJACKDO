package com.najackdo.server.domain.location.dto;

import com.najackdo.server.domain.location.entity.Location;

import lombok.Data;

public class LocationData {

	@Data
	public static class Request {
		private double longitude;
		private double latitude;
	}

	@Data
	public static class Search {
		private int locationCode;
		private String locationName;
		private Double letitude;
		private Double longitude;


		public static Search fromEntity(Location location) {
			Search search = new Search();
			search.setLocationCode(location.getId());
			search.setLocationName(location.getLocationName());
			search.setLetitude(location.getLocationPoint().getY());
			search.setLongitude(location.getLocationPoint().getX());
			return search;
		}
	}

	@Data
	public static class SearchWithGeom{
		private int locationCode;
		private String locationName;
		// private String locationPoint;
		// private String polygon;

		public static SearchWithGeom fromEntity(Location location) {
			SearchWithGeom search = new SearchWithGeom();
			search.setLocationCode(location.getId());
			search.setLocationName(location.getLocationName());
			// search.setLocationPoint(location.getLocationPoint().toString());
			// search.setPolygon(location.getLocationPolygon().toString());
			return search;
		}
	}

	@Data
	public static class Regist{
		Integer locationCode;
		Double distanceMeters;
	}
}
