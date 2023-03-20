package org.iclass.rest.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.iclass.rest.dto.NewMember;

@Mapper
public interface MemberMapper {
	int insert(NewMember member);
	int update(NewMember member);
	int delete(String id);
	NewMember selectOne(String id);
	List<NewMember> selectAll();
	NewMember login(Map<String,String> map);
}
