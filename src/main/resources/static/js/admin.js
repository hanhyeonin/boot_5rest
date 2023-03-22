/**
	admin.html 
 */

// checkbox 선택으로 문자열 만들어주는 함수
document.querySelector('#hobby').addEventListener('click', function() {
	let hobbies = String();
	document.querySelectorAll('.hobby').forEach(item => {
		if (item.checked) hobbies = hobbies.concat(item.value, ",")
	});
	document.querySelector('#hobbies').value = hobbies
});

let isValidId = 1	// 전역변수

// id 중복검사 비동기 통신
document.querySelector('#id').addEventListener('keyup', function() {
	// 1. 입력값 가져오기
	const id = document.querySelector('#id').value

	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/idCheck/' + id)
	xhr.send()		// 요청 전송 POST일때는 body와 함께 보냅니다.(POST, PUT)
	xhr.onload = function() {
		if (xhr.status == 200 || xhr.status === 201) {
			let check = JSON.parse(xhr.response)
			isValidId = check.count
			if (isValidId === 0) {
				document.querySelector('#idOk').innerHTML = '사용 가능한 아이디입니다.'
				document.querySelector('#idOk').style.color = "green"
			} else {
				document.querySelector('#idOk').innerHTML = '이미 사용중인 아이디입니다.'
				document.querySelector('#idOk').style.color = "red"
			}
		} else {
			console.error('오류', xhr.status)
		}
	}
})

// input 요소 초기화
const clear = function() {
	document.querySelector('#id').value = ''
	document.querySelector('#name').value = ''
	document.querySelector('#password').value = ''
	document.querySelector('#email').value = ''
	document.querySelector('#age').value = ''
	document.querySelector('#hobbies').value = ''
	document.querySelector('#json').innerHTML = '여기에 받은 데이터 json 문자열 표시합니다.' /*태그안에 있는 문자열 수정 innerHTML*/
	document.querySelectorAll('.hobby').forEach(item => item.checked = false) /*여러개일경우 SelectorAll*/
}

document.querySelector('#clear').addEventListener('click', clear)

// 각 메소트에 따른 비동기 통신 요청을 보내는 버튼들.

// 응답을 위한 전역변수 사용
const jsonStr = document.querySelector('#json')

// json 응답을 그대로 보여줄 p태그

// 전체 리스트 값 가져오기
document.querySelector('#getAll').addEventListener('click', function() {
	const xhr = new XMLHttpRequest();		// 비동기 통신 객체
	xhr.open('GET', '/api/members')			// 전송 보낼 준비 : 메소드 방식과 url 설정
	xhr.send()								// 요청 전송. body와 함께 보낼 때가 있습니다.(POST, PUT)
	xhr.onload = function() {				// 요청에 대한 응답을 받았을 때. 이벤트 onload 핸들러 함수
		if (xhr.status == 200 || xhr.status === 201) {		// == 값 비교, === 값,타입 비교
			jsonStr.innerHTML = xhr.response			// xhr.response는 json 문자열
			const list = JSON.parse(xhr.response)		// 자바스크립트 객체의 배열
			makeList(list)
		} else {
			console.error('오류', xhr.status)
		}
	}
})

// 전체 리스트 값 테이블 생성하는 함수
function makeList(list) {		// 객체의 배열

	//응답받은 data (배열)로 반복실행 Array.from(list)
	document.querySelector('tbody').innerHTML = ''			// 초기화
	list.forEach(member => {    							//배열에서 하나 가져온 member
		const $tr = document.createElement("tr");			// tr 태그 생성
		const $temp =
			'<td>' + member.id + '</td>' +
			'<td>' + member.name + '</td>' +
			'<td>' + member.email + '</td>' +
			'<td>' + member.age + '</td>' +
			'<td>' + member.hobbies + '</td>';
		$tr.innerHTML = $temp;
		document.querySelector('tbody').appendChild($tr);	// tbody 태그안에 tr 태그를 자식으로 만들어준다.
	});
}

// 아이디로 조회
document.querySelector('#getOne').addEventListener('click', function() {
	// id값 필수 입력해야합니다.
	const id = document.querySelector('#id').value

	if (id == '') {
		alert('아이디 입력해야해.')
		return;
	}

	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/member/' + id)
	xhr.send()
	xhr.onload = function() {
		if (xhr.status == 200 || xhr.status === 201) {
			jsonStr.innerHTML = xhr.response
			const jsonObj = JSON.parse(xhr.response)
			const isOk = jsonObj.isOk
			// 변환된 자바스크립트 객체로 input 에 값 출력시키기.
			if (isOk == 'fail') {
				alert('조회된 회원이 없습니다.!')
			} else if (isOk == 'success') {
				const member = jsonObj.member
				document.getElementById('name').value = member.name;
				document.getElementById('email').value = member.email;
				document.getElementById('age').value = member.age;
				document.getElementById('hobbies').value = member.hobbies;
				document.querySelectorAll('.hobby').forEach(item => {
					//customer.hobby 에 있는 텍스트가 체크박스 요소의 value 를 포함하고 있는지 각각 비교함.
					if (member.hobbies.includes(item.value)) item.checked = true;
					else item.checked = false;
				});
			}

		} else {
			console.error('오류', xhr.status)
		}
	}
})

document.querySelector('#save').addEventListener('click', function() {
	if (isValidId == 1) {
		alert('아이디 중복검사를 확인해주세요. 디지기시르면^^')
		return;
	}
	// 1. 입력값 가져오기
	const id = document.querySelector('#id').value
	const name = document.querySelector('#name').value
	const password = document.querySelector('#password').value
	const email = document.querySelector('#email').value
	const age = document.querySelector('#age').value
	const hobbies = document.querySelector('#hobbies').value

	// 2. 입력값으로 자바객체 생성
	const jObj = {
		"id": id,
		"name": name,
		"password": password,
		"email": email,
		"age": age,
		"hobbies": hobbies
	}

	// 3. 자바스크립트 객체를 보내기 위해 직렬화(문자열로 변환)
	const jStr = JSON.stringify(jObj)

	const xhr = new XMLHttpRequest();

	xhr.open('POST', '/api/member')
	xhr.send(jStr)		// 요청 전송 POST일때는 body와 함께 보냅니다.(POST, PUT)
	xhr.onload = function() {
		if (xhr.status == 200 || xhr.status === 201) {
			jsonStr.innerHTML = xhr.response
			clear()			// 정상 등록 후 입력 요소 초기화
		} else {
			console.error('오류', xhr.status)
		}
	}
})


// 회원정보 수정
document.querySelector('#update').addEventListener('click', function() {
	const id = document.querySelector('#id').value
	const email = document.querySelector('#email').value
	const age = document.querySelector('#age').value
	const hobbies = document.querySelector('#hobbies').value
	
	// java script 객체
	const jObj = {
		"id": id,
		"email": email,
		"age": age,
		"hobbies": hobbies
	}
	const xhr = new XMLHttpRequest()
	xhr.open('PUT', '/api/member/'+id)		// 조회 할 아이디
	xhr.setRequestHeader('content-type', 'application/json; charset=utf-8')		// body 에 형식을 갖는 header

	const data 	= JSON.stringify(jObj)			// 자바 객체를 문자열로 직렬화한 것.
	xhr.send(data)
	xhr.onload = function() {
		if (xhr.status == 200 || xhr.status === 201) {
			jsonStr.innerHTML = xhr.response
			
		} else {
			console.error('오류', xhr.status)
		}
	}
})

// 회원정보 삭제
document.querySelector('#delete').addEventListener('click',function(){
	const id = document.querySelector('#id').value
	const xhr = new XMLHttpRequest()
	xhr.open('DELETE', '/api/member/'+id)		// 조회 할 아이디
	xhr.send()
	xhr.onload = function() {
		if (xhr.status == 200 || xhr.status === 201) {
			jsonStr.innerHTML = xhr.response
		} else {
			console.error('오류', xhr.status)
		}
	}
})




