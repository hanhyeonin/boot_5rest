/**
 * 
 */
//검색버튼 클릭하면 4개의 검색 파라미터를 가져와서 설정합니다.
document.getElementById('search').addEventListener('click',function(){
	const query = document.getElementById('query').value	
	const size = document.getElementById('size').value	
	const page = document.getElementById('page').value	
	
	let sort = document.getElementById('accuracy').checked	//정확도순 라디오 체크? 결과는 참 또는 거짓
	if(sort) sort ='accuracy'	//sort 변수는 boolean 값을 저장했다가 string 저장  (자바스크립트에서 가능)
	else sort = 'recency'  //최근순
	
	alert(`query=${query}&page=${page}&size=${size}&sort=${sort}`)
	if(query=='') alert('검색어는 필수로 입력해야 합니다.')		//카카오 검색 api에서 필수값
	else search(query,page,size,sort)
})

const search = (query,page,size,sort) => {
 //비동기 통신을 위한 비동기 통신 라이브러리 객체 생성
   const xhr = new XMLHttpRequest();      //데이터를 저장하는 용도 json객체 (초창기에는 xml 파일사용)

   //1.HTTP 요청 초기화 : method(GET,POST,PUT,DELETE),url 
   xhr.open("GET",`https://dapi.kakao.com/v2/search/vclip?query=${query}&page=${page}&size=${size}&sort=${sort}`);      //size는 기본값 10

   //2.요청header 설정 : 인증키
   xhr.setRequestHeader("Authorization","KakaoAK 5811eddecdc2643f4a6a2179dc6a811f");
   
   //3.HTTP요청 전송 : 추가적인 파라미터는 함께 전송
   xhr.send();

   let results=''
   //4.onload  : 요청이 완료되고 이에 대한 응답이 왔을 때 실행될 onload 이벤트 핸들러 작성.
   xhr.onload = function() {
      //응답코드가 200일때만 정상
      if(xhr.status==200) {		//status 프로퍼티는 응답코드 저장 
         												 //xhr.response 는 프로퍼입니다.응답 데이터를 저장.
		//document.getElementById('list').innerHTML= xhr.response
         let $response = JSON.parse(xhr.response)        //xhr.response 는 문자열 -> 자바스크립트 객체로 변환
         results = $response.documents       //author,datetime, title,url,play-time,thumbnail 속성으로 구성된 객체 **배열**
        console.log($response.meta) 
		document.getElementById('count').innerHTML='전체 검색 건수 : ' + $response.meta.total_count
		results.forEach(element => {            //results 배열의 각 값들을 순서대로 element가 참조하며 함수 실행합니다.
                           const $ul = document.createElement('ul')        //새로운 ul태그요소 생성
                           // ${}:표현식기호-변수,수식,함수..결과값이 있는것에 사용가능
                           const temp = `<li>${element.author}</li>     
                           <li>${element.title}</li>
                           <li>${element.datetime}</li>
                           <li>${element.play_time}</li>
                           <li><a href=${element.url} target="_blank">
							<img src=${element.thumbnail} width="200px"></a></li>`
                           //url은 a태그, thumbnail은 img 태그에 속성값으로 활용할수 있습니다.

                           $ul.innerHTML=temp                              //ul 태그 요소의 innerHTML 설정
                           document.getElementById('list').appendChild($ul) 
						//ul태그 요소를  <p id="list"></p> 의 자식요소로 추가
						
       })
		
   
      } //if 끝

      console.log(results)
   }   //onload 끝
}
//html 새로고침 될때 바로 실행되도록 함수 호출
//search('java 강의',2,10,'accuracy')
