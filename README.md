# 🌙Good Night
'좋은'잠을 자기 위한 정보와 아이템들을 공유하고 서로 소통하는 커뮤니티입니다!😄

![image](https://user-images.githubusercontent.com/103625778/173978179-97200753-a3da-46cc-a297-a2f641dc41ce.png)

## 📆 제작 기간 및 팀원 소개 👨‍💻
- 2022.06.10 ~ 2022.06.16
- Front-end
	- 최지훈 [Github](https://github.com/Choiji92)
	- 이성일 [Github](https://github.com/a01040579861)
	- 변희재 [Github](https://github.com/qusgmlwo)
- Back-end
	- 윤기남 [Github](https://github.com/wea9677)
	- 홍승현 [Github](https://github.com/seunghyeon5)

## 💻 Front-end 
- 회원가입, 로그인 기능 구현
- 게시물,댓글 CRUD 기능 구현
- 게시물 좋아요 기능 구현
- 무한스크롤 기능 구현

## 💻 Back-end
[Back-end](https://github.com/seunghyeon5/Hanghae-mini)

## 🌎 Website
[GoodNight](http://choijireact.s3-website.ap-northeast-2.amazonaws.com/)

## 🎬 기능 구현 영상
[유튜브영상](https://www.youtube.com/watch?v=Fi7oqnWlLmo)

## 📝 노션 설계 페이지
[노션 페이지](https://teamsparta.notion.site/S-A-3-e2bbc99e7ce1472b8fb5a9e264f0bdbd)
## 와이어 프레임
[Figma](https://www.figma.com/file/C1gHoQyWs2VNG9WwyH2jLI/mini_project_3-team-library?node-id=0%3A1)
## 🛠 Front-end 기술 스택 및 개발 환경
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
	<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
	 <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=white">
	 <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
	  <img src="https://img.shields.io/badge/axios-2C5BB4?style=for-the-badge&logo=axios&logoColor=white">
		 <br/>
		 <img src="https://img.shields.io/badge/React Router Dom-CA4245?style=for-the-badge&logo=React Router Dom&logoColor=white">
	  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
	 <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
		 <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
		 <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
		
## 🗒️  페이지 & 기능
### 1. 로그인, 회원가입
- JWT를 사용하여 로그인과 회원가입을 구현
- 아이디 및 닉네임 중복 확인과 2차 비밀번호 확인 가능 (아이디는 이메일 형식, 비밀번호는 최소 하나의 문자, 하나의 숫자, 및 하나의 특수문자 포함 최소 8자 이상)
- 회원정보 DB에 저장, 회원가입 완료 후 로그인 페이지로 이동
- 로그인시 token 발급
### 2. 메인 페이지
- 헤더 부분에 로그인한 유저의 닉네임 확인 가능
- 모든 유저가 작성한 컨텐츠를 최신 순으로 확인 가능
- 해당 컨텐츠 클릭시 상세 페이지로 이동
- 모든 컨텐츠에 좋아요를 누를 수 있음(단, 하나의 컨텐츠에 같은 아이디로 좋아요 여러번 못함)
- 처음에 컨텐츠를 8개만 볼 수 있고 스크롤을 내릴 때마다 8개씩 추가로 더 볼 수 있음(무한 스크롤)
### 3. 컨텐츠 작성 페이지
- 타이틀,내용,이미지 모두 작성해야 작성버튼이 활성화 됨
- 이미지 업로드시 미리보기 구현
- 타이틀 , 내용 입력시 미리보기 구현
- 로그인을 안한 상태로 글 작성 페이지에 들어오면 로그인을 하라는 메시지가 보이는 페이지로 이동
### 4. 컨텐츠 상세 페이지
- 해당 컨텐츠를 개시한 작성자만 컨텐츠를 수정, 삭제할 수 있는 버튼이 활성화 됨
- 모든 유저가 작성한 댓글을 최신순으로 확인 가능
- 해당 댓글 작성자만 댓글 수정, 삭제할 수 있는 버튼이 활성화 됨
- 상세 페이지에서도 해당 컨텐츠 좋아요 가능
### 5. 컨텐츠 수정 페이지
- 기존 컨텐츠의 정보들(타이틀,내용,이미지)이 그대로 유지되서 보여짐
- 수정을 따로 안하면 기존 컨텐츠가 개시되고 시간은 수정된 시간으로 업데이트 됨

## ⚙️ Trouble Shooting
- 무한 스크롤 구현시 게시글을 몇번 부터 불러올지에 대한 정보를 백엔드로 보내줘야하는데 그 정보를 main component에서 state로 구현했더니 상세페이지를 들어갔다가 다시 메인페이지로 돌아오면 state가 초기화 되면서 또 다시 컨텐츠들이 로드됨 
	- 게시글을 몇번 부터 불러올지에 대한 정보를 Redux Store에 initialState에 만들어서 추가 로드 될때마다 그 정보를 업데이트하여 백엔드로 보내줌으로써 해결함
- input에서 입력하는 내용을 다른 div 에서 보여주는 과정에서 input에서는 줄바꿈을 해도 div에선 줄바꿈이 되지않는 현상이 발생함
	- div쪽 style에서 ```whiteSpace:'pre-wrap'``` 을 추가하여 해결함
- 무한 스크롤시 처음에 불러오는 데이터 말고 그 후에 불러오는 데이터에 대한 상세페이지에가서 새로고침을하면 현재 리덕스 스토어에 데이터가 없어서 에러가 남
	- 상세페이지에 들어갈 때 그 해당 컨텐츠만 데이터베이스에서 다시 가져와서 스토어에서 별개의 state에 저장하여 가져옴으로써 해결함