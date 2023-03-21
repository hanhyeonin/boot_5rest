package org.iclass.rest.dto;


import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude={"password","hobby"})		// exclude = toString 문자열 만들 때 제외시킬 필드
public class NewMember {
	private String id;
	private String name;
	
//	@JsonIgnore		// insert 사용을 위해 주석처리
	private String password;
	
	private String email;
	private int age;
	private String gender;  
	private String hobbies;		// 취미를 , 로 나열
	
	@JsonIgnore					// 직렬화 또는 역직렬화에서 제외
	private String[] hobby;		
	// ㄴ 컬럼에 없는 변수이기 때문에 sql xml에서 mapping 할때 꼭 기본생성자와 setter 가 있어야한다. 
	// 기본생성자가 없으면 AllArgsConstructor 할때, 컬럼순서와 변수선언순서가 일치해야한다.
	// 이럴 때 String[] hoddy 이런 변수사용은 오류를 만든다.
	
	private LocalDateTime joinDate;		// 커스텀으로 LocalDateTime 타입 직렬 또는 역직렬 패턴 설정
	private String address;
	
	
}
