package org.iclass.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.iclass.rest.dto.NewMember;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

// rest api 서비스 제공을 위한 컨트롤러 구현
@RestController
@Slf4j
public class RestApiTestController {
	
	private ObjectMapper objMapper = new ObjectMapper();
	
	// GET : 조회, POST : 데이터 저장

	@GetMapping("/api/hello")
	public String apiHello() {
		return "비동기 ajax 통신에 대한 응답으로 보내는 문자열입니다.";		// 리턴되는 값이 응답 데이터
	}
	
	@GetMapping("/api/json")
	public String apiJson() throws JsonProcessingException {
		NewMember m1 = NewMember.builder()
				.id("Zior Park")
				.name("지올팍")
				.age(19)
				.address("서울")
				.hobbies("야구,스키")
				.gender("M").build();
		
		NewMember m2 = NewMember.builder()
				.id("IU")
				.name("아이유")
				.age(19)
				.address("서울")
				.hobbies("수영,노래")
				.gender("F").build();
		
		NewMember m3 = NewMember.builder()
				.id("eoajfl")
				.name("빡빡이")
				.age(20)
				.address("부산")
				.hobbies("축구,야구,스키")
				.gender("U").build();
		
		Map<String, Object> result = new HashMap<>();
		Map<String, List<NewMember>> maplist = new HashMap<>();
		
		maplist.put("MapList1", List.of(m1));
		maplist.put("MapList2", List.of(m2));
		maplist.put("MapList3", List.of(m3));
		
		result.put("member", "회원");
		result.put("count", 1);
		result.put("list", List.of(m1,m2,m3));
		result.put("test", m1);
		result.put("maplist", maplist);
		// Map 객체를 직렬화
		String jsonString = objMapper.writeValueAsString(result);
		
		return jsonString;
	}
	
	@PostMapping("/api/json")
	public String apiPost(@RequestBody String member) throws JsonMappingException, JsonProcessingException {		
	// 요청 데이터에 대한 어노테이션 설정. 어노테이션이 없으면 파라미터.
		log.info("----- POST 방식 요청 데이터 : {} -----", member);
		// 역직렬화(Json 문자열을 NewMember 객체로 변환)
		// db에 저장
		String read = member;
		return "success";
	}
	
	@GetMapping("/api/spring")		// Pk 또는 유일값으로 1개를 조회하는 경우에는 파라미터로 했습니다.
	public String getOne(String id) {		// 메소드 인자는 파라미터 (기존방식)
		log.info("::: 요청 파라미터 id : {}",id);
		
		return "success";
	}
	
	@GetMapping("/api/spring/{id}")	// 접근하려는 자원을 uri로 지정함. - REST 방식
	public String getOne2(@PathVariable String id) {	     
		// @PathVariable 는 path(경로) 로 전달된 변수값 저장 어노테이션
		log.info("::: path 변수 id : {}",id);
		return "success";
	}
}
