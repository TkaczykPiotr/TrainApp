package com.SystemyInformacyjne.TrainApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@SpringBootApplication
public class TrainApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrainApplication.class, args);
	}

//	@Bean
//	public CorsFilter corsFilter() {
//		CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowCredentials(true);
//		configuration.addExposedHeader("*");
//		configuration.setAllowedOrigins(List.of("http://localhost:3000"));
//				configuration.setAllowedHeaders(List.of(
//						"Origin",
//						"Access-Control-Allow-Origin",
//						"Access-Control-Request-Method",
//						"Access-Control-Request-Headers",
//						"Content-Type",
//						"Accept",
//						"Authorization",
//						"X-Requested-With",
//						"Accept, Origin"
//				));
//		configuration.setExposedHeaders(List.of(
//				"Origin",
//				"Content-Type",
//				"Accept",
//				"Authorization",
//				"Access-Control-Allow-Origin",
//				"Access-Control-Request-Credentials"
//		));
//		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//
//		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
//		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration);
//		return new CorsFilter(urlBasedCorsConfigurationSource);
//	}
}
