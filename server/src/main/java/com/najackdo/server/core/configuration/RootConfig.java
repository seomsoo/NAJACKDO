package com.najackdo.server.core.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.modelmapper.ModelMapper;

@Configuration
public class RootConfig {
	@Bean
	public ModelMapper getMapper() {
		return new ModelMapper();
	}
}