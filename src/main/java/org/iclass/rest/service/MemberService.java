package org.iclass.rest.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.iclass.rest.dao.MemberMapper;
import org.iclass.rest.dto.NewMember;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberMapper dao;

	public int join() {
		return 0;
	}
	public NewMember login(String id, String password) {
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("password", password);
		return dao.login(map);
	}
	public NewMember member(String id) {
		return dao.selectOne(id);
	}
	
	public List<NewMember> selectAll(){
		return dao.selectAll();
	}

	public int insert(NewMember vo) {
		// db 저장
		return dao.insert(vo);
	}
	
	public int update(NewMember vo) {
		return dao.update(vo);
	}
	
	public int idCheck(String id) {
		return dao.idCheck(id);
	}
	
	public int valid(Map<String, Object> map) {
		return dao.valid(map);
	}
	
	public int delete(String id) {
		return dao.delete(id);
	}
}
