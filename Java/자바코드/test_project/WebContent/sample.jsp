<%@ page contentType = "text/html; charset=utf-8" %> 
<%@ page import = "java.sql.DriverManager" %> 
<%@ page import = "java.sql.Connection" %> 
<%@ page import = "java.sql.Statement" %> 
<%@ page import = "java.sql.ResultSet" %> 
<%@ page import = "java.sql.SQLException" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Member List</title>
</head>
<body> 
	MEMBMER Table Contents 
	    <table width="100%" border="1"> 
	    <tr> 
	    <td>Name</td>
	    <td>ID</td>
	    <td>E-Mail</td> 
	    </tr> 
	    <% 
	    // MySQL JDBC Driver Loading 
	    Class.forName("com.mysql.jdbc.Driver"); 
	    
		Connection conn = null; 
	     Statement stmt = null; 
	     ResultSet rs = null; 
	
	     try { 
	         String jdbcDriver = "jdbc:mysql://localhost:3306/testdb?" + "useUnicode=true&characterEncoding=utf8&serverTimezone=UTC"; 
	         String dbUser = "root"; 
	         String dbPass = "rkddbal1"; 
	         String query = "select * from tt;"; 
	         // Create DB Connection 
	         conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass); 
	         
	         // Create Statement 
	         stmt = conn.createStatement(); 
	         
	         // Run Qeury 
	         rs = stmt.executeQuery(query); 
	         
	         // Print Result (Run by Query) 
	         while(rs.next()) { 
	     %> 
	     <tr> 
	         <td><%= rs.getString("NAME") %></td> 
	         <td><%= rs.getString("ID") %></td> 
	         <td><%= rs.getString("EMAIL") %></td> 
	     </tr>
	     <% 
	         } 
	     } catch(SQLException ex) { 
	         out.println(ex.getMessage()); 
	         ex.printStackTrace(); 
	     } finally { 
	         // Close Statement 
	         if (rs != null) try { rs.close(); } catch(SQLException ex) {} 
	         if (stmt != null) try { stmt.close(); } catch(SQLException ex) {} 
	         
	         // Close Connection 
	         if (conn != null) try { conn.close(); } catch(SQLException ex) {} 
	     } 
	%> 
	</table>
</body>
</html>