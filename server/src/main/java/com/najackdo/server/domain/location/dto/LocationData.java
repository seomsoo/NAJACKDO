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
		private double longitude;
		private double latitude;

		public static Search fromEntity(Location location) {
			Search search = new Search();
			search.setLocationCode(location.getId());
			search.setLocationName(location.getLocationName());
			search.setLongitude(location.getLocationPoint().getY());
			search.setLatitude(location.getLocationPoint().getX());
			return search;
		}
	}
}
