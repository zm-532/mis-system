const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 数据库连接配置
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 请替换
  password: 'zhuming123', // 请替换
  database: 'campus'   // 请替换
});

// 测试数据库连接
db.connect(err => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('数据库连接成功');
  }
});

// 获取所有学生
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM student', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});
// 新增学生
app.post('/api/students', (req, res) => {
  const { student_no, name, leader, assigned, passed, not_found } = req.body;
  const sql = 'INSERT INTO student (student_no, name, leader, assigned, passed, not_found) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [student_no, name, leader, assigned, passed, not_found], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, id: result.insertId });
  });
});
// 获取所有园区
app.get('/api/parks', (req, res) => {
  db.query('SELECT * FROM park', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 编辑学生
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { student_no, name, leader, assigned, passed, not_found } = req.body;
  const sql = 'UPDATE student SET student_no=?, name=?, leader=?, assigned=?, passed=?, not_found=? WHERE id=?';
  db.query(sql, [student_no, name, leader, assigned, passed, not_found, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// 删除学生
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM student WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// 新增园区
app.post('/api/parks', (req, res) => {
  const { park_name, province, assigned_student, leader, student_status, first_review, final_review } = req.body;
  const sql = 'INSERT INTO park (park_name, province, assigned_student, leader, student_status, first_review, final_review) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [park_name, province, assigned_student, leader, student_status, first_review, final_review], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, id: result.insertId });
  });
});

// 编辑园区
app.put('/api/parks/:id', (req, res) => {
  const { id } = req.params;
  const { park_name, province, assigned_student, leader, student_status, first_review, final_review } = req.body;
  const sql = 'UPDATE park SET park_name=?, province=?, assigned_student=?, leader=?, student_status=?, first_review=?, final_review=? WHERE id=?';
  db.query(sql, [park_name, province, assigned_student, leader, student_status, first_review, final_review, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// 删除园区
app.delete('/api/parks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM park WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});
// 监听端口
app.listen(3001, () => {
  console.log('后端服务已启动，端口3001');
}); 
