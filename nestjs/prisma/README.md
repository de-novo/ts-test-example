# DB 설계

> 본 프로젝트는 테스트코드를 연습하기위한 "미니 프로젝트"로써 회원 관리 측면만 다룬다.

# 요구사항

> ### 기본
>
> 1. 사용자는 비회원, 회원 두 부류를 포함한다.
> 2. 사용자의 접속기록을 추적할 수 있어야한다.

> ### 회원 가입 및 인증
>
> 1. 사용자는 이메일 또는 소셜 미디어 계정을 통해 회원가입을 할 수 있어야한다.
> 2. 이메일 인증 또는 소셜 인증을 통한 본인 확인 절차가 필요하다.

> ### 사용자 프로필 관리
>
> 1. 사용자는 자신의 프로필 정보(이름, 연락처, 주소 등)을 수정 할 수 있어야한다.
> 2. 프로필 사진 업로드 및 수정 기능이 포함되어야 한다.

> ### 보안 및 개인정보 보호
>
> 1. 모든 사용자 데이터는 암호화되어 저장되어야 한다.
> 2. 사용자의 개인정보 보호를 위한 정책 및 사용자 등의 절차가 필요하다.

> ### 사용자 권한 관리
>
> 1. 관리자, 사용자등의 다양한 권한 레벨을 설정하여 기능 접근에 제한 할 수 있어야한다.
>
> - 본 프로젝트에서는 시스템관리자, 조직관리자, 회원, 등의 권한 레벨을 둘 것이다.
>   > ### 사용자 멤버십
>   >
>   > - 결제 유무에 따라 접근제한을 할 수 있어야 한다.

> ### 사용자 활동 로깅
>
> - 사용자의 로그인, 로그아웃등에대한 로그 기록을 추적 할 수 있어야한다.

