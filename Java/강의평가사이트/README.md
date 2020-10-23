# JSP를 활용한 강의평가 웹사이트

---

- Java
- Jsp
- Tomcat
- Eclipse
- MYSQL

```java
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
	         String jdbcDriver = "jdbc:mysql://localhost:3306/ch2?" + "useUnicode=true&characterEncoding=utf8"; 
	         String dbUser = "camel"; 
	         String dbPass = "1234"; 
	         String query = "select * from MEMBER order by MEMBERID"; 
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
	         <td><%= rs.getString("MEMBERID") %></td> 
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
```



