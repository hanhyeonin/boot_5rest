package org.iclass.rest;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.iclass.rest.dto.NewMember;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest				// 스프링부트 테스트 
@Slf4j						// log 확인하기
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)		// 테스트 메소드 순서 정하기
class JsonSerializrTest {

	// 직렬화(java객체를 json 문자열로 변환), 역직렬화()에 공통으로 사용할 객체를 생성
	// 직렬화의 목적 : 데이터 교환(보내기.송신)을 위해 간결한 형식의 문자열을 사용.
	private ObjectMapper objectMapper = new ObjectMapper();
	
	@Test @Order(1)		// 테스트 순서는 편의상 정합니다.
	void test() throws JsonProcessingException {
		// 자바 객체
		NewMember member = NewMember.builder()
				.id("Zior Park")
				.name("지올팍")
				.age(19)
				.address("서울")
				.hobbies("야구,스키")
				.gender("F")
//				.joinDate()
//					ㄴ 커스텀으로 LocalDateTime 타입 직렬 또는 역직렬 패턴 설정해야 함.
				.build();
		
		String result = objectMapper.writeValueAsString(member);		// 직렬화
		log.info("==== java 객체 직렬화 된 json : {} ====", result);
		
		assertNotEquals(0, result.length());		// result의 길이가 0이 아니여야 한다.
	}
	
	// 데이터 교환에서 받기(수신)는 json 문자열, 역직렬화의 목적 : 받은 데이터를 자바 또는 자바스크립트로 객체로 변환하기
	@Test @Order(2)
	void deserializr() throws JsonMappingException, JsonProcessingException {
		String result = 
//				"{\"id\":\"Zior Park\",\"name\":\"지올팍\",\"email\":null,\"age\":19,\"gender\":\"F\",\"hobbies\":\"야구,스키\",\"joinDate\":null,\"address\":\"서울\"}";		// json 문자열
				"{\"id\":\"Zior Park\",\"name\":\"지올팍\",\"email\":null,\"age\":19,\"gender\":\"F\",\"hobbies\":\"야구,스키\",\"joinDate\":\"2023-03-20\",\"address\":\"서울\"}";		// json 문자열
					// " 전달할 문자이기 때문에 \" 으로 사용
		
		NewMember member = objectMapper.readValue(result, NewMember.class);
		
		log.info("==== Json 문자열 역직렬화 된 java 객체 : {} ====", member);
		
		assertNotNull(member);
		
	}
}
