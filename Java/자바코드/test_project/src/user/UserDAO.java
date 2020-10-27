package user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import util.DatabaseUtil;

public class UserDAO {
	public int join(String id, String pass) {
		String SQL = "insert into user values(?,?)";
		try {
			Connection conn = DatabaseUtil.getConnection();
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, id);
			pstmt.setString(2, pass);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;
	}
	
	
	public static Connection getConnection() {
		try {

			String dbURL = "jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC";
			String dbID = "root";
			String dbPassword = "root";
			Class.forName("com.mysql.jdbc.Driver");

			return DriverManager.getConnection(dbURL,dbID,dbPassword);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}	
}
