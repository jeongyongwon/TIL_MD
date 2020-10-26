# JSP를 활용한 강의평가 웹사이트

---



### Project source

- Java
- Jsp
- Tomcat
- Eclipse
- MYSQL



### 알아둬야 할 것 같은 자바개념 👌



#### Java Servlet

- ##### 클라이언트 요청을 처리하고 그 결과를 다시 클라이언트에게 전송하는 Servlet 클래스의 구현 규칙을 지킨 자바 프로그램" (클라이언트의 HTTP 요청에 대해 특정 기능을 수행, HTML문서를 생성등의 응답을 하는 인터넷 서버 프로그램)

  

#### JRE(Java Runtime Enviroment)

- ##### 자바 실행환경(Java Runtime Enviroment)의 약자이다.

- ##### JVM이 자바 프로그램을 동작시킬 때 필요한 라이브러리 파일들과 기타파일을 가지고 있음

#### 



### Convention❗❗

- database이름과 패키지를 동일하게 만든다



------

### 이클립스  내에서  MYSQL과 연동할 스키마를 작성한다

#### Java Resources > src > user(여기부터 생성) > UserDTO.java  

***DTO*(*Data Transfer Object*)

```jAVA
public class UserDTO {
	String name;
	int id;
	String email;
}
```



### 그리고 나서 우측 마우스 >  Source  > Generater getter and setter를 하고 모두 선택을 한다.

#### => 그러면 아래와 같이 바뀜

```java
package user;

public class UserDTO {
	String userid;
	String userpass;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getUserpass() {
		return userpass;
	}
	public void setUserpass(String userpass) {
		this.userpass = userpass;
	}
}
```



### 그리고 Java Resource 에 util이라는 패키지를 만들고 그 안에 DatabaseUtil.java를 만든다

```java
package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseUtil {
	
	public static Connection getConnection() {
		try {
			String dbURL = "jdbc:mysql://localhost:3306/testdb";
			String dbID = "root";
			String dbPassword = "rkddbal1";
			Class.forName("com.mysql.Driver");
			return DriverManager.getConnection(dbURL,dbID,dbPassword);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
}

```



### 그리고 UserDAO.java에 아래와 같은 내용을 넣어준다.

**DAO(Data Access Object) => 직접적으로 데이터베이스 접근하는 것

```java
package user;

import java.sql.Connection;
import java.sql.PreparedStatement;

import util.DatabaseUtil;

public class UserDAO {
	public int join(String userid, String userpass) {
		String SQL = "INSERT INTO USER VALUES (?,?)";
		try {
			Connection conn = DatabaseUtil.getConnection();
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, "userid");
			pstmt.setString(2, "userpass");
			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;
	}
}

```



### 그리고  WebContent > index.jsp를 만들고 아래에 form을 만들어준다

```java
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>우리의 첫 번째 페이지</title>
</head>
<body>
	Hello world!
	<form action="./userJoinAction.jsp" method="post">
		<input type="text" name="userid">
		<input type="text" name="userpass">
		<input type="submit" value="회원가입">
	</form>

</body>
</html>
```





