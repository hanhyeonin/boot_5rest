package org.iclass.rest.dto;


import java.sql.Timestamp;

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
@ToString
public class NewMember {
	private String id;
	private String name;
	private String password;
	private String email;
	private int age;
	private String gender;  
	private String hobbies;		// 취미를 , 로 나열
	private String[] hobby;		
	// ㄴ 컬럼에 없는 변수이기 때문에 sql xml에서 mapping 할때 꼭 기본생성자와 setter 가 있어야한다. 
	// 기본생성자가 없으면 AllArgsConstructor 할때, 컬럼순서와 변수선언순서가 일치해야한다.
	// 이럴 때 String[] hoddy 이런 변수사용은 오류를 만든다.
	private Timestamp joinDate;		// 년월일 시분초
	private String address;
	
	
}
