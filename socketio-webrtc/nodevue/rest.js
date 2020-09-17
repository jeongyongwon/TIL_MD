const Mydb = require('./mydb');

module.exports = function(app, pool) {
  app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email;  // cf. req.body, req.query
    testJson.aa = req.query.aa;
    res.json(testJson);
  });

  app.get('/apis/replies/:bno', (req, res) => {
    let bno = req.params.bno;
    let mydb = new Mydb(pool);
    mydb.execute( conn => {
      conn.query("select * from Reply where bno=? limit 10", [bno], (err, ret) => {
        res.json(ret);
      });
    });
  });

  app.get('/apis/replies/:bno/:rno', (req, res) => {
    let bno = req.params.bno,
        rno = req.params.rno;

    let mydb = new Mydb(pool);
    mydb.execute( conn => {
      conn.query("select * from Reply where rno=?", [rno], (err, ret) => {
        res.json(ret[0]);
      });
    });
  });

  app.put('/apis/replies/:bno/:rno', (req, res) => {
    let bno = req.params.bno,
        rno = req.params.rno,
        replytext = req.body.replytext;

    let mydb = new Mydb(pool);
    mydb.executeTx( conn => {
      conn.query("update Reply set replytext = ? where rno = ?", [replytext, rno], (err, ret) => {
        if (err) {
          conn.rollback();
          throw err;
        }

        res.json(ret.affectedRows);
        conn.commit();
      });
    });
  });

  app.get('/dbtest/:user', (req, res) => {
    let user = req.params.user;
    let mydb = new Mydb(pool);
    mydb.execute( conn => {
      conn.query("select * from User where uid=?", [user], (err, ret) => {
        res.json(ret);
      });
    });
  });
};