package ru.lprcup.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        System.out.print("Added\n");
        registry.addResourceHandler("/**") // URL путь к ресурсам
                .addResourceLocations("classpath:/static/"); // Физический путь к ресурсам в проекте
    }
}