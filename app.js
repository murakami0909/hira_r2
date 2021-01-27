const express = require('express');
const app = express();
app.use(express.static('www'));
const mysql = require('mysql');
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hiragana_db'
});

app.get('/hello', (req, res) => {
  res.render('hello.ejs');
});

app.get('/hiragana', (req, res) => {
  connection.query('SELECT * FROM hiragana_db', 
   (error, results) => {
  res.render('hiragana.ejs', {items: results});
  });

  app.get('/new', (req, res) => {
    res.render('new.ejs');
  });

  app.post('/update', (req, res) => {
    // データベースに追加する処理を書いてください
    console.log(req.body.hiraganaName+"さぁ！");
      connection.query(
      'UPDATE hiragana_db SET name= ? WHERE hiragana = "あ"',
      [req.body.hiraganaName],
      (error, results) => {
        res.redirect('/hiragana');
          }
        );
      });
});
app.listen(3000);
