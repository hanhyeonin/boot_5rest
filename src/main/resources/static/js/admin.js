/**
	admin.html 
 */
const clear = function(){
	document.querySelector('#id').value=''
	document.querySelector('#name').value=''
	document.querySelector('#password').value=''
	document.querySelector('#email').value=''
	document.querySelector('#age').value=''
	document.querySelector('#hobbies').value=''
	document.querySelector('#json').innerHTML='여기에 받은 데이터 json 문자열 표시합니다.' /*태그안에 있는 문자열 수정 innerHTML*/
	document.querySelectorAll('.hobby').forEach(item => item.checked =false) /*여러개일경우 SelectorAll*/
}

 document.querySelector('#clear').addEventListener('click',clear)
 
 // 각 메소트에 따른 비동기 통신 요청을 보내는 버튼들.
 
 // 응답을 위한 전역변수 사용
 const jsonStr = document.querySelector('#json')
 
 document.querySelector('#getAll').addEventListener('click',function(){
	 const xhr = new XMLHttpRequest();		// 비동기 통신 객체
	 xhr.open('GET','/api/members')			// 전송 보낼 준비 : 메소드 방식과 url 설정
	 xhr.send()								// 요청 전송. body와 함께 보낼 때가 있습니다.(POST, PUT)
	 xhr.onload=function(){					// 요청에 대한 응답을 받았을 때. 이벤트 onload 핸들러 함수
		 if(xhr.status == 200 || xhr.status === 201){		// == 값비교, === 값,타입 비교
			 jsonStr.innerHTML = xhr.response
		 }else{
			 console.error('오류',xhr.status)
		 }
	 }
 })
 document.querySelector('#getOne').addEventListener('click',function(){
	 const id = document.querySelector('#id').value
	  const xhr = new XMLHttpRequest();
	  xhr.open('GET','/api/member/'+id)
	  xhr.send()
	  xhr.onload=function(){					
		 if(xhr.status == 200 || xhr.status === 201){		
			 jsonStr.innerHTML = xhr.response
		 }else{
			 console.error('오류',xhr.status)
		 }
	 }
 })
 document.querySelector('#save').addEventListener('click',function(){
	// 1. 입력값 가져오기
	const id = document.querySelector('#id').value
	const name = document.querySelector('#name').value
	const password = document.querySelector('#password').value
	const email = document.querySelector('#email').value
	const age = document.querySelector('#age').value
	const hobbies = document.querySelector('#hobbies').value
	
	// 2. 입력값으로 자바객체 생성
	const jObj = {"id":id, 
	"name":name, 
	"password":password, 
	"email":email, 
	"age":age, 
	"hobbies":hobbies}
	
	 // 3. 자바스크립트 객체를 보내기 위해 직렬화(문자열로 변환)
	 const jStr = JSON.stringify(jObj)
	 const xhr = new XMLHttpRequest();
	 
	  xhr.open('POST','/api/member')
	  xhr.send(jStr)		// 요청 전송 POST일때는 body와 함께 보냅니다.(POST, PUT)
	  xhr.onload=function(){					
		 if(xhr.status == 200 || xhr.status === 201){		
			 jsonStr.innerHTML = xhr.response
		 }else{
			 console.error('오류',xhr.status)
		 }
	 }
 })