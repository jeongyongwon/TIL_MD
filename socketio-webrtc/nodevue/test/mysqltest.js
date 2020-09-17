const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : '115.71.233.22',
  user     : 'testuser',
  password : 'testuser!@#',
  database : 'testdb'
});
 
connection.connect();

connection.beginTransaction(err2 => {
  connection.query('update User set lastlogin=now() where uid=?', ['user2'], function (error, results, fields) {
    if (error) throw error;
    console.log('The Update', results.affectedRows);

    connection.query('select * from User where uid=?', ['user2'], function (error, results, fields) {
      if (error) throw error;
      console.log('The First User is: ', results[0]);

      connection.query('delete ', (error) => {
        if (error) throw error;
        connection.end();  
      });

      
    });
  });
});


 

