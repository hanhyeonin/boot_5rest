package org.iclass.rest.config;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

// 직렬화에 LocalDateTime 타입의 문자열 패턴 정하기
public class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime>{
	
	public static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
	
	@Override
	public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider serializers) throws IOException {

		gen.writeString(dtf.format(value));				//LocalDateTime 을 String으로 변환
		
	}
}
