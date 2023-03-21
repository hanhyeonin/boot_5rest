##### synchronous 동기 방식 
+ 동기식 통신은 요청-응답이 순서대로 이루어지는 통신. 요청에 대한 응답을 정상적으로 받을 때가지 기다려야 하고 그 후 다른 요청을 보낼 수 있다.
+ 클라이언트가 요청 보내기 ->  서버 처리 -> 서버가 클라이언트에게 응답 보내기 
<html> 에서 </html> 까지 완전한 html 문서를 서버로부터 받아서 브라우저에 표시한다.
    + 일부분만 변경되는 요청이 발생해도 매번 요청에 대해 문서 전체 html 응답을 생성한다. (불필요한 서버의 처리와 통신 발생)
    + 서버로부터 응답을 받기까지 다음 처리는 대기한다.(blocking)

##### 비동기 처리
+ 비동기 통신은 요청-응답이 항상 순서를 지키지 않으며 사용자가 보낸 요청의 응답을 정상적으로 받는 것과 상관없이 기다리지 않고 다른 요청을 보낼 수 있다.
+ 웹에서의 비동기 통신 : 자바스크립트(엔진)는 싱글스레드 방식으로 동작하지만 브라우저는 멀티스레드 방식이므로 비동기 처리가 가능한다.  자바스크립트에서 비동기 처리를 위한 객체를 제공한다. 
+ 자바스크립트에서 비동기 처리를 수행하는 비동기 함수는 콜백 패턴을 사용한다.
    + setTimeout(Web API), setInterval, HTTP 요청, 이벤트핸들러는 비동기 처리 방식으로 동작한다.

##### Ajax (Asynchronous Javascript and XML)
+ 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고 서버가 응답한 데이터를 수신하여 그 데이터에 대한 부분만 웹페이지를 동적으로 갱신하는 프로그래밍 방식이다.
+ 웹페이지 전체를 렌더링 하지 않고 부분적으로 하여 응답 속도와 성능의 효율이 높아진다.자바스크립트와 같은 프로트엔드로 처리한다.
+ Ajax 는 Web API 인 XMLHttpRequest 객체로 동작한다. XML은 데이터 태그를 트리구조 형식으로 구성하여 처리 방식이 비효율적
+ JSON 
    + 클라이언트와 서버간의 HTTP 통신을 위한 텍스트 데이터 포맷이다. 자바스크립트 객체 형식이다.많은 프로그래밍언어에서 사용한다.
    + key 는 큰 따옴표, 문자열도 큰 따옴표 기호를 사용해야 한다.
    + JSON.stringify 메소드는 객체(또는 배열)를 JSON 형식 문자열로 변환한다.(직렬화)
    + JSON.parse 메소드는 반대 동작.(역직렬화)
    + 객체 : const obj ={
        id: 1,
        name: 'sana',
        age: 25,
        hobby: ['movie','yoga']
    };
    + JSON 문자열 : 
    " {
      "id": 1,
      "name": "sana",
      "age": 25,
      "hobby": ["movie","yoga"]
    }"

##### XMLHttpRequest 객체
+ 자바스크립트를 사용하여 HTTP 요청을 전송한다.  HTTP 응답 수신을 위한 다양한 메소드와 프로퍼티도 제공한다.
+ 메소드
    + open :** HTTP 요청 초기화. 파라미터는 메소드 방식과 url 이다.
    + send : **HTTP 요청 전송
    + abort : 전송된 요청 중단
    + setRequestHeader : 특정헤더값 설정
    + getResponseHeader : 특정헤다값 반환
+ 프로퍼티
    + readyState : HTTP 요청의 현재상태를 나타낸다. 
            UNSENT(open메소드 호출이전):0 , OPENED(이후) : 1, 
            HEADERS_RECEIVED(send메소드 호출 이후):2, 
            LOADING(서버 응답중):3, DONE(서버응답완료):4
    + status :** HTTP 요청에 대한 응답 상태. 예:200   https://developer.mozilla.org/ko/docs/Web/HTTP/Status/
    + statusText : HTTP 요청에 대한 응답 메시지. 예:OK    
    + responseType : document, json, text,blob, arraybuffer
    + response : HTTP 요청에 대한 응답 몸체(데이터)
    + responseText : 서버가 전송한 HTTP요청에 대한 응답 문자열
+ 이벤트 핸들러 프로퍼티
    + onreadystatechange : readystate 값이 변경되었을때
    + onload : **요청이 성공적으로 완료되었을 때

##### HTTP 요청 메소드
    + GET : index/retrieve(모든 특정리소스 반환)
        + 데이터를 URL 일부분 즉 쿼리 문자열로 서버에 전송한다.
    + POST : create (리소스 생성)
        + 데이터(페이로드)를 요청 몸체 request body 에 담아 전송한다.
        + 페이로드가 객체이면 JSON.stringify 로 문자열로 변환(직렬화)해야 한다.
    + PUT : replace(리소스 전체 바꾸기)
    + PATCH : modify(리소스 일부 수정)
    + DELETE : delete(모든 또는 특정 리소스 삭제),페이로드 X

##### REST API
+ REpressentational State Transfer
    + HTTP의 장점을 활용하기 위한 소프트웨어 아키텍처. 
    + HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정하였다.
    + RESTful 서비스는 REST 의 규칙에 따라 만들어진 시스템이다.
+ 구성
    + 사용하려는 자원 resource : URI 로 표현한다.URI는 명사로 표현한다.
    + 행위 verb : HTTP 요청 메소드를 이용하여 CRUD 를 구현한다.
    + 표현 repressentations : 데이터이다.
+ 클라이언트의 Ajax 통신 요청에 대한 응답으로 데이터를 제공하기 위해서 서버에서 api를 구현하는 방식
+ __요청파라미터를 URI로 전달해서 처리할수 있습니다.__

##### 참고 : 비동기통신 구현의 어려운점. 실행결과 확인이 어렵다. 추가도구 : talend
https://chrome.google.com/webstore/ 에서 검색 : talend