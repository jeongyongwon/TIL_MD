<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page import="user.UserDTO" %>
<%@ page import="user.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		request.setCharacterEncoding("UTF-8");
		String userid = null;
		String userpass = null;
		if(request.getParameter("id") != null) {
			userid = (String) request.getParameter("id");
		}
		if(request.getParameter("pass") != null) {
			userpass = (String) request.getParameter("pass");
		}
		if(userid == null || userpass == null) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('입력이 안된 사항이 있습니다.')");
			script.println("history.back()");
			script.println("</script>");
			script.close();
			return;
			
		}
		UserDAO userDAO = new UserDAO();
		int result = userDAO.join(userid, userpass);
		if (result == 1) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('회원가입에 성공했습니다.')");
			script.println("location.href='index.jsp'");
			script.println("</script>");
			script.close();
			return;
		}
	%>
</body>
</html>