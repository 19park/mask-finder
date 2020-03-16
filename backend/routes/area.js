const express = require('express');
const router = express.Router();

const mysql = require('mysql');
// Connection 객체 생성
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '!qkrwjdghks1',
  database: 'park'
});
// Connect
connection.connect(function (err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});

router.get('/area/:type', function (req, res) {
  let setQuery = '';
  switch (req.params.type) {
    case '1':
      setQuery = 'select TYPE_CODE1, AREA_NAME1 from area_info group by TYPE_CODE1';
      break;
    case '2':
      setQuery = 'select TYPE_CODE2, AREA_NAME2 from area_info where TYPE_CODE1 = \''+ req.query.code +'\' group by TYPE_CODE2';
      break;
    case '3':
      setQuery = 'select TYPE_CODE3, AREA_NAME3 from area_info where TYPE_CODE2 = \''+ req.query.code +'\' group by TYPE_CODE3';
      break;
    default:
      res.status(404).send('잘못된 접근입니다.');
      break;
  }
  const query = connection.query(
      setQuery,
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send('정보를 가져올 수 없습니다. '+ req.params.type);
        }
        res.status(200).send(result);
      }
  );
});

module.exports = router;
