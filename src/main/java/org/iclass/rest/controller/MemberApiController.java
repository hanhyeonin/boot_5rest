package org.iclass.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.iclass.rest.dto.NewMember;
import org.iclass.rest.service.MemberService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class MemberApiController {

	private MemberService service;
	private ObjectMapper objMapper = new ObjectMapper();
	
	public MemberApiController(MemberService service) {
		this.service = service;
	}
	
	@GetMapping("/api/members")
	public String members(NewMember member) throws JsonProcessingException {
		List<NewMember> list = service.selectAll();
		
		return objMapper.writeValueAsString(list);
	}
	
	@GetMapping("/api/member/{id}")		// 특정데이터를 입력할 때
	public String member(@PathVariable String id) {
		return "members get : " + id;
	}
	
	@PostMapping("/api/member")
	public String save(@RequestBody String member){
		log.info("request body : {}",member);
		
		NewMember vo = null;
		int cnt = 0;
		String json=null;
		try {
			// 역직렬화
			vo = objMapper.readValue(member, NewMember.class);
			
			cnt = service.insert(vo);
			Map<String, Object> result = new HashMap<>();
			result.put("성공여부", cnt);
			
			// 직렬화
			json = objMapper.writeValueAsString(result);
			
		} catch (JsonProcessingException e) {
			e.getMessage();
		}
		return "회원가입:"+json+" 성공시1, 실패시0";
	}
	
	@GetMapping("/api/idCheck/{id}")
	public String idCheck(@PathVariable String id) throws JsonProcessingException {
		int count = service.idCheck(id);
		Map<String, Object> result = new HashMap<>();
		result.put("count", count);
		return objMapper.writeValueAsString(result);
	}
	
	@GetMapping("/api/valid/{id}")	// 나중에 확인해보기
	public String valid(String column, @PathVariable String value) throws JsonProcessingException {
		Map<String, Object> title = new HashMap<>();
		title.put("column", "id");
		title.put("value", value);
		int count = service.valid(title);
		Map<String, Object> result = new HashMap<>();
		result.put("count", count);
		System.out.println(result);
		return objMapper.writeValueAsString(result);
	}
	
	
}
