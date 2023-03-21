package org.iclass.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

	@GetMapping("/")
	public String index() {
		return "index";			// index.html
	}
	
	@GetMapping("/admin")
	public void admin() {
		// 리턴이 없으면 요청 url 과 동일한 html 파일명이 view 파일.
	}
}
