package com.notice.summernote.Notice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CLASS :: 클라이언트에서 요청한 리소스 경로 핸들링
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    /**
     * FUNCTION :: 클라이언트에서 요청한 리소스 URL 경로(이미지 파일)가 들어오면 외부 경로에 있는 리소스를 매핑
     * @param registry
     */
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/summernoteImage/**")
//                .addResourceLocations("file:///C:/summernote_image/");
//    }
}