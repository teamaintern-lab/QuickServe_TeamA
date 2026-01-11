package com.quickservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final SessionInterceptor sessionInterceptor;
    

    public WebConfig(SessionInterceptor sessionInterceptor,
                     @Value("${app.frontend.origin:http://localhost:5173}") String frontendOrigin) {
        this.sessionInterceptor = sessionInterceptor;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:5173")
        .allowedMethods("*")
        .allowCredentials(true);

    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(sessionInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                        "/api/auth/**",
                        "/api/services",
                        "/api/public/**",
                        "/api/admin/**",   
                        "/error"
                );
    }

}
