/**
	admin.html 
 */
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

function makeList(list) {		// 객체의 배열
	console.log(list);
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

document.querySelector('#getOne').addEventListener('click', function() {
	const id = document.querySelector('#id').value
	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/member/' + id)
	xhr.send()
	xhr.onload = function() {
		if (xhr.status == 200 || xhr.status === 201) {
			jsonStr.innerHTML = xhr.response
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
		} else {
			console.error('오류', xhr.status)
		}
	}
})