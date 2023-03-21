package org.iclass.rest.config;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

// 역직렬화에 LocalDateTime 타입의 문자열 패턴 정하기
public class LocalDateTimeDeSerializer extends JsonDeserializer<LocalDateTime>{
	
	public static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
	
	@Override
	public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {

		return LocalDateTime.parse(p.getText(), dtf);
	}
}
//https://d2.naver.com/helloworld/0473330