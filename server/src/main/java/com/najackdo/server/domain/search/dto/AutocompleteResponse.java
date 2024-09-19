package com.najackdo.server.domain.search.dto;

import java.util.List;

public class AutocompleteResponse {

	private final List<Data> list;

	public AutocompleteResponse(List<Data> list) {
		this.list = list;
	}

	public List<Data> getList() {
		return list;
	}

	public static class Data {
		private final String value;
		private final double score;

		public Data(String value, double score) {
			this.value = value;
			this.score = score;
		}

		public String getValue() {
			return value;
		}

		public double getScore() {
			return score;
		}
	}
}