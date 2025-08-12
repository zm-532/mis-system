import React, { useEffect, useState, useMemo } from 'react';
import { Layout, Table, Typography, Space, Tabs, Button, Modal, Form, Input, message, Popconfirm, Row, Col, Select, Card, Statistic } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, UserOutlined, CheckCircleOutlined, CloseCircleOutlined, FileTextOutlined, DownloadOutlined, CheckSquareOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;


function App() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [parks, setParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [activeTab, setActiveTab] = useState('student');
  const [isAnnouncementModalVisible, setIsAnnouncementModalVisible] = useState(false);

  // 学生表相关状态
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm] = Form.useForm();
  const [studentSearchText, setStudentSearchText] = useState('');
  const [studentSearchField, setStudentSearchField] = useState('all');

  // 园区表相关状态
  const [isParkModalOpen, setIsParkModalOpen] = useState(false);
  const [editingPark, setEditingPark] = useState(null);
  const [parkForm] = Form.useForm();
  const [parkSearchText, setParkSearchText] = useState('');
  const [parkSearchField, setParkSearchField] = useState('all');


  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/students');
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('获取学生数据失败:', error);
      message.error('获取学生数据失败');
    }
  };

  const fetchParks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/parks');
      const data = await response.json();
      setParks(data);
      setFilteredParks(data);
    } catch (error) {
      console.error('获取园区数据失败:', error);
      message.error('获取园区数据失败');
    }
  };


  useEffect(() => {
    fetchStudents();
    fetchParks();
  }, []);

  const exportToExcel = (data, columns, fileNamePrefix) => {
    try {
      const exportData = data.map((item, index) => {
        const row = { '序号': index + 1 };
        columns.forEach(col => {
          if (col.dataIndex) {
            row[col.title] = item[col.dataIndex];
          }
        });
        return row;
      });
      
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      const colWidths = columns.map(col => ({ wch: col.title.length > 5 ? col.title.length * 2 : 12 }));
      colWidths.unshift({ wch: 6 });
      ws['!cols'] = colWidths;

      XLSX.utils.book_append_sheet(wb, ws, `${fileNamePrefix}数据`);

      const now = new Date();
      const dateStr = now.toLocaleDateString('zh-CN').replace(/\//g, '-');
      const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false }).replace(/:/g, '-');
      const fileName = `${fileNamePrefix}_${dateStr}_${timeStr}.xlsx`;

      XLSX.writeFile(wb, fileName);
      message.success(`导出成功！共导出 ${data.length} 条记录`);
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败，请重试');
    }
  };

  const handleStudentSearch = (value) => {
    setStudentSearchText(value);
    if (!value.trim()) {
      setFilteredStudents(students);
      return;
    }
    const filtered = students.filter(student => {
      const searchValue = value.toLowerCase();
      switch (studentSearchField) {
        case 'student_no': return student.student_no && student.student_no.toString().toLowerCase().includes(searchValue);
        case 'name': return student.name && student.name.toLowerCase().includes(searchValue);
        case 'leader': return student.leader && student.leader.toLowerCase().includes(searchValue);
        default: return (
          (student.student_no && student.student_no.toString().toLowerCase().includes(searchValue)) ||
          (student.name && student.name.toLowerCase().includes(searchValue)) ||
          (student.leader && student.leader.toLowerCase().includes(searchValue))
        );
      }
    });
    setFilteredStudents(filtered);
  };

  const handleStudentReset = () => {
    setStudentSearchText('');
    setStudentSearchField('all');
    setFilteredStudents(students);
  };
  
  const handleStudentSearchFieldChange = (value) => {
    setStudentSearchField(value);
    if (studentSearchText) {
      handleStudentSearch(studentSearchText);
    }
  };

  const exportStudentsToExcel = () => {
    const studentExportColumns = [
      { title: '学号', dataIndex: 'student_no' },
      { title: '姓名', dataIndex: 'name' },
      { title: '组长', dataIndex: 'leader' },
      { title: '分配条数', dataIndex: 'assigned' },
      { title: '通过条数', dataIndex: 'passed' },
      { title: '未找到', dataIndex: 'not_found' }
    ];
    exportToExcel(filteredStudents, studentExportColumns, "学生数据");
  }

  const handleParkSearch = (value) => {
    setParkSearchText(value);
    if (!value.trim()) {
      setFilteredParks(parks);
      return;
    }
    const filtered = parks.filter(park => {
      const searchValue = value.toLowerCase();
      switch (parkSearchField) {
        case 'park_name': return park.park_name && park.park_name.toLowerCase().includes(searchValue);
        case 'province': return park.province && park.province.toLowerCase().includes(searchValue);
        case 'assigned_student': return park.assigned_student && park.assigned_student.toLowerCase().includes(searchValue);
        case 'leader': return park.leader && park.leader.toLowerCase().includes(searchValue);
        default: return (
          (park.park_name && park.park_name.toLowerCase().includes(searchValue)) ||
          (park.province && park.province.toLowerCase().includes(searchValue)) ||
          (park.assigned_student && park.assigned_student.toLowerCase().includes(searchValue)) ||
          (park.leader && park.leader.toLowerCase().includes(searchValue))
        );
      }
    });
    setFilteredParks(filtered);
  };

  const handleParkReset = () => {
    setParkSearchText('');
    setParkSearchField('all');
    setFilteredParks(parks);
  };

  const handleParkSearchFieldChange = (value) => {
    setParkSearchField(value);
    if (parkSearchText) {
      handleParkSearch(parkSearchText);
    }
  };

  const exportParksToExcel = () => {
    const parkExportColumns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '园区名称', dataIndex: 'park_name' },
      { title: '省份', dataIndex: 'province' },
      { title: '分配学生', dataIndex: 'assigned_student' },
      { title: '组长', dataIndex: 'leader' },
      { title: '学生状态', dataIndex: 'student_status' },
      { title: '初审状态', dataIndex: 'first_review' },
      { title: '终审状态', dataIndex: 'final_review' },
    ];
    exportToExcel(filteredParks, parkExportColumns, '园区数据');
  };

  const statistics = useMemo(() => {
    const data = filteredStudents;
    const totalAssigned = data.reduce((sum, student) => sum + (parseInt(student.assigned) || 0), 0);
    const totalPassed = data.reduce((sum, student) => sum + (parseInt(student.passed) || 0), 0);
    const totalNotFound = data.reduce((sum, student) => sum + (parseInt(student.not_found) || 0), 0);
    const totalNotSubmitted = totalAssigned - (totalPassed + totalNotFound);
    const passRate = totalAssigned > 0 ? ((totalPassed / totalAssigned) * 100).toFixed(1) : 0;
    return { totalAssigned, totalPassed, totalNotFound, totalNotSubmitted, passRate };
  }, [filteredStudents]);

  // ==================== 关键修改点 1: 最终版统计逻辑 ====================
  const globalStatistics = useMemo(() => {
    const totalStudents = students.length;
    const totalAssigned = students.reduce((sum, student) => sum + (parseInt(student.assigned) || 0), 0);
    const totalPassed = students.reduce((sum, student) => sum + (parseInt(student.passed) || 0), 0); // 找到总数
    const totalNotFound = students.reduce((sum, student) => sum + (parseInt(student.not_found) || 0), 0);
    
    // 新增：计算“通过数量”
    const totalCompleted = totalPassed + totalNotFound;

    // 更新：“未提交总数”的计算
    const totalNotSubmitted = totalAssigned - totalCompleted;

    // 更新：“通过率”的计算
    const passRate = totalAssigned > 0 ? ((totalCompleted / totalAssigned) * 100).toFixed(1) : 0;
    
    return { 
      totalStudents, 
      totalAssigned, 
      totalPassed,       // 保留“找到总数”
      totalCompleted,    // 新增“通过数量”
      totalNotFound, 
      totalNotSubmitted, 
      passRate, 
    };
  }, [students]);

  const handleEditStudent = (record) => {
    setEditingStudent(record);
    studentForm.setFieldsValue(record);
    setIsStudentModalOpen(true);
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/students/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        message.success('删除成功');
        await fetchStudents();
        if (studentSearchText) handleStudentSearch(studentSearchText);
      } else { message.error('删除失败'); }
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
  };

  const handleStudentSubmit = async () => {
    try {
      const values = await studentForm.validateFields();
      const url = editingStudent ? `http://localhost:3001/api/students/${editingStudent.id}` : 'http://localhost:3001/api/students';
      const method = editingStudent ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        message.success(editingStudent ? '编辑成功' : '添加成功');
        setIsStudentModalOpen(false);
        await fetchStudents();
        if (studentSearchText) handleStudentSearch(studentSearchText);
      } else { message.error(editingStudent ? '编辑失败' : '添加失败'); }
    } catch (error) {
      console.error('提交错误:', error);
      if (!error.errorFields) message.error(editingStudent ? '编辑失败' : '添加失败');
    }
  };

  const handleStudentModalCancel = () => {
    setIsStudentModalOpen(false);
    studentForm.resetFields();
    setEditingStudent(null);
  };

  const showAddParkModal = () => {
    setEditingPark(null);
    parkForm.resetFields();
    setIsParkModalOpen(true);
  };

  const handleParkEdit = (record) => {
    setEditingPark(record);
    parkForm.setFieldsValue(record);
    setIsParkModalOpen(true);
  };

  const handleParkDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/parks/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        message.success('删除园区成功');
        await fetchParks();
        if (parkSearchText) handleParkSearch(parkSearchText);
      } else {
        message.error('删除园区失败');
      }
    } catch (error) {
      console.error('删除园区失败:', error);
      message.error('删除园区失败');
    }
  };

  const handleParkSubmit = async () => {
    try {
      const values = await parkForm.validateFields();
      const url = editingPark ? `http://localhost:3001/api/parks/${editingPark.id}` : 'http://localhost:3001/api/parks';
      const method = editingPark ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        message.success(editingPark ? '编辑园区成功' : '添加园区成功');
        setIsParkModalOpen(false);
        await fetchParks();
        if (parkSearchText) handleParkSearch(parkSearchText);
      } else {
        message.error(editingPark ? '编辑园区失败' : '添加园区失败');
      }
    } catch (error) {
      console.error('提交园区错误:', error);
      if (!error.errorFields) message.error(editingPark ? '编辑园区失败' : '添加园区失败');
    }
  };

  const handleParkModalCancel = () => {
    setIsParkModalOpen(false);
    parkForm.resetFields();
    setEditingPark(null);
  };

  const studentColumns = [
    { title: '学号', dataIndex: 'student_no', key: 'student_no' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '组长', dataIndex: 'leader', key: 'leader' },
    { title: '分配条数', dataIndex: 'assigned', key: 'assigned', sorter: (a, b) => a.assigned - b.assigned },
    { title: '通过条数', dataIndex: 'passed', key: 'passed', sorter: (a, b) => a.passed - b.passed },
    { title: '未找到', dataIndex: 'not_found', key: 'not_found', sorter: (a, b) => a.not_found - b.not_found },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => handleEditStudent(record)}>编辑</Button>
          <Popconfirm title="确定要删除这个学生吗？" onConfirm={() => handleDeleteStudent(record.id)} okText="确定" cancelText="取消">
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const parkColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80, sorter: (a, b) => a.id - b.id },
    { title: '园区名称', dataIndex: 'park_name', key: 'park_name' },
    { title: '省份', dataIndex: 'province', key: 'province' },
    { title: '分配学生', dataIndex: 'assigned_student', key: 'assigned_student' },
    { title: '组长', dataIndex: 'leader', key: 'leader' },
    { title: '学生状态', dataIndex: 'student_status', key: 'student_status' },
    { title: '初审状态', dataIndex: 'first_review', key: 'first_review' },
    { title: '终审状态', dataIndex: 'final_review', key: 'final_review' },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => handleParkEdit(record)}>编辑</Button>
          <Popconfirm title="确定要删除这个园区吗？" onConfirm={() => handleParkDelete(record.id)} okText="确定" cancelText="取消">
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const tabItems = [
    {
      key: 'student',
      label: '学生表',
      children: (
        <>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Row gutter={16} align="middle">
              <Col flex="none">
                <Space>
                  <Button type="primary" onClick={() => { setEditingStudent(null); studentForm.resetFields(); setIsStudentModalOpen(true); }}>添加学生</Button>
                  <Button type="primary" icon={<DownloadOutlined />} onClick={exportStudentsToExcel} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>导出Excel</Button>
                </Space>
              </Col>
              <Col flex="auto">
                <Row gutter={8} justify="end">
                  <Col>
                    <Select value={studentSearchField} onChange={handleStudentSearchFieldChange} style={{ width: 120 }} >
                      <Option value="all">全部字段</Option>
                      <Option value="student_no">学号</Option>
                      <Option value="name">姓名</Option>
                      <Option value="leader">组长</Option>
                    </Select>
                  </Col>
                  <Col>
                    <Input.Search
                      placeholder={studentSearchField === 'leader' ? '输入组长名字查看组内情况' : '请输入搜索内容'}
                      value={studentSearchText} onChange={(e) => setStudentSearchText(e.target.value)} onSearch={handleStudentSearch}
                      style={{ width: 280 }} enterButton={<SearchOutlined />} allowClear />
                  </Col>
                  <Col>
                    <Button icon={<ReloadOutlined />} onClick={handleStudentReset} title="重置搜索">重置</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            {studentSearchText && (
              <Row>
                <Col span={24}>
                  <Card size="small" style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                    <div style={{ color: '#389e0d', fontSize: '14px' }}>
                      <strong>{studentSearchField === 'leader' ? `${studentSearchText} 组的统计情况：` : `搜索结果：`}</strong>
                      找到 {filteredStudents.length} 条记录
                      {studentSearchField !== 'all' && ` (在${studentSearchField === 'student_no' ? '学号' : studentSearchField === 'name' ? '姓名' : '组长'}中搜索)`}
                      {filteredStudents.length > 0 && (
                        <span style={{ marginLeft: '16px' }}>
                          | 分配: {statistics.totalAssigned} | 通过: {statistics.totalPassed} | 未找到: {statistics.totalNotFound} | 通过率: {statistics.passRate}%
                        </span>
                      )}
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
          </Space>
          <Table
            columns={studentColumns}
            dataSource={filteredStudents}
            rowKey="id"
            bordered
            pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true, showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条` }}
            scroll={{ x: 'max-content' }}
            style={{ background: '#fff', marginTop: 16 }}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row style={{ background: '#fafafa' }}>
                  <Table.Summary.Cell index={0} colSpan={3}><strong>搜索结果合计</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}><strong style={{ color: '#722ed1' }}>{statistics.totalAssigned}</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={4}><strong style={{ color: '#52c41a' }}>{statistics.totalPassed}</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={5}><strong style={{ color: '#ff4d4f' }}>{statistics.totalNotFound}</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={6} colSpan={2}><strong>通过率: {statistics.passRate}%</strong></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </>
      ),
    },
    {
      key: 'park',
      label: '园区表',
      children: (
        <>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Row gutter={16} align="middle">
              <Col flex="none">
                <Space>
                  <Button type="primary" onClick={showAddParkModal}>添加园区</Button>
                  <Button type="primary" icon={<DownloadOutlined />} onClick={exportParksToExcel} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>导出Excel</Button>
                </Space>
              </Col>
              <Col flex="auto">
                <Row gutter={8} justify="end">
                  <Col>
                    <Select value={parkSearchField} onChange={handleParkSearchFieldChange} style={{ width: 120 }}>
                      <Option value="all">全部字段</Option>
                      <Option value="park_name">园区名称</Option>
                      <Option value="province">省份</Option>
                      <Option value="assigned_student">分配学生</Option>
                      <Option value="leader">组长</Option>
                    </Select>
                  </Col>
                  <Col>
                    <Input.Search
                      placeholder="请输入搜索内容"
                      value={parkSearchText}
                      onChange={(e) => setParkSearchText(e.target.value)}
                      onSearch={handleParkSearch}
                      style={{ width: 280 }}
                      enterButton={<SearchOutlined />}
                      allowClear
                    />
                  </Col>
                  <Col>
                    <Button icon={<ReloadOutlined />} onClick={handleParkReset} title="重置搜索">重置</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            {parkSearchText && (
              <Row>
                <Col span={24}>
                  <Card size="small" style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}>
                    <div style={{ color: '#1890ff', fontSize: '14px' }}>
                      <strong>搜索结果：</strong>
                      找到 {filteredParks.length} 条记录
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
          </Space>
          <Table
            columns={parkColumns}
            dataSource={filteredParks}
            rowKey="id"
            bordered
            pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true, showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条` }}
            scroll={{ x: 'max-content' }}
            style={{ background: '#fff', marginTop: 16 }}
          />
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header style={{ background: '#1677ff', padding: '0 24px' }}>
        <Title level={2} style={{ color: '#fff', lineHeight: '64px', margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>园区信息</span>
            <span>园区项目治理流程文档：<a href="https://jcnj27eldas8.feishu.cn/wiki/C8SXwCTtWiCrqvkV2opc1GWUn9c?from=from_copylink" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>点击查看</a></span>
          </div>
        </Title>
      </Header>
      <Content style={{ margin: '32px auto', maxWidth: 1200, width: '100%' }}>
        <Space direction="vertical" size={32} style={{ width: '100%' }}>
          <Card style={{ background: '#fff', borderRadius: 8 }}>
            <Title level={4} style={{ marginBottom: 16 }}>总体统计</Title>
            {/* ==================== 关键修改点 2: 最终版统计卡片UI ==================== */}
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8} lg={3}><Card size="small" style={{ textAlign: 'center' }}><Statistic title="学生总数" value={globalStatistics.totalStudents} prefix={<UserOutlined />} valueStyle={{ color: '#1890ff' }} /></Card></Col>
              <Col xs={24} sm={12} md={8} lg={3}><Card size="small" style={{ textAlign: 'center' }}><Statistic title="分配总数" value={globalStatistics.totalAssigned} prefix={<FileTextOutlined />} valueStyle={{ color: '#722ed1' }} /></Card></Col>
              <Col xs={24} sm={12} md={8} lg={3}><Card size="small" style={{ textAlign: 'center' }}><Statistic title="找到总数" value={globalStatistics.totalPassed} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#52c41a' }} /></Card></Col>
              
              <Col xs={24} sm={12} md={8} lg={3}><Card size="small" style={{ textAlign: 'center' }}><Statistic title="未找到总数" value={globalStatistics.totalNotFound} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#ff4d4f' }} /></Card></Col>
              <Col xs={24} sm={12} md={8} lg={3}><Card size="small" style={{ textAlign: 'center' }}><Statistic title="确认数量" value={globalStatistics.totalCompleted} prefix={<CheckSquareOutlined />} valueStyle={{ color: '#13c2c2' }} /></Card></Col>
              <Col xs={24} sm={12} md={8} lg={3}><Card size="small" style={{ textAlign: 'center' }}><Statistic title="未提交总数" value={globalStatistics.totalNotSubmitted} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#faad14' }} /></Card></Col>
              <Col xs={24} sm={12} md={8} lg={6}><Card size="small" style={{ textAlign: 'center' }}><Statistic title="完成率" value={globalStatistics.passRate} suffix="%" precision={1} valueStyle={{ color: globalStatistics.passRate >= 80 ? '#52c41a' : globalStatistics.passRate >= 60 ? '#13c2c2' : '#ff4d4f' }} /></Card></Col>
            </Row>
          </Card>
          
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} type="card" style={{ background: '#fff', padding: 16, borderRadius: 8 }} />
        </Space>
      </Content>
      
      <Modal title={editingStudent ? "编辑学生" : "添加学生"} open={isStudentModalOpen} onOk={handleStudentSubmit} onCancel={handleStudentModalCancel} okText="确定" cancelText="取消" destroyOnClose>
        <Form form={studentForm} layout="vertical" name="student_form">
          <Form.Item name="student_no" label="学号" rules={[{ required: true, message: '请输入学号' }]}><Input placeholder="请输入学号" /></Form.Item>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}><Input placeholder="请输入姓名" /></Form.Item>
          <Form.Item name="leader" label="组长" rules={[{ required: true, message: '请输入组长' }]}><Input placeholder="请输入组长" /></Form.Item>
          <Form.Item name="assigned" label="分配条数" rules={[{ required: true, message: '请输入分配条数' }, { pattern: /^\d+$/, message: '请输入有效数字' }]}><Input placeholder="请输入分配条数" type="number" /></Form.Item>
          <Form.Item name="passed" label="通过条数" rules={[{ required: true, message: '请输入通过条数' }, { pattern: /^\d+$/, message: '请输入有效数字' }]}><Input placeholder="请输入通过条数" type="number" /></Form.Item>
          <Form.Item name="not_found" label="未找到" rules={[{ required: true, message: '请输入未找到条数' }, { pattern: /^\d+$/, message: '请输入有效数字' }]}><Input placeholder="请输入未找到条数" type="number" /></Form.Item>
        </Form>
      </Modal>

      <Modal title={editingPark ? "编辑园区" : "添加园区"} open={isParkModalOpen} onOk={handleParkSubmit} onCancel={handleParkModalCancel} okText="确定" cancelText="取消" destroyOnClose>
        <Form form={parkForm} layout="vertical" name="park_form">
          <Form.Item name="park_name" label="园区名称" rules={[{ required: true, message: '请输入园区名称' }]}><Input placeholder="请输入园区名称" /></Form.Item>
          <Form.Item name="province" label="省份" rules={[{ required: true, message: '请输入省份' }]}><Input placeholder="请输入省份" /></Form.Item>
          <Form.Item name="assigned_student" label="分配学生"><Input placeholder="请输入分配的学生姓名" /></Form.Item>
          <Form.Item name="leader" label="组长"><Input placeholder="请输入组长姓名" /></Form.Item>
          <Form.Item name="student_status" label="学生状态"><Input placeholder="例如：已完成/进行中" /></Form.Item>
          <Form.Item name="first_review" label="初审状态"><Input placeholder="例如：通过/未通过" /></Form.Item>
          <Form.Item name="final_review" label="终审状态"><Input placeholder="例如：通过/未通过" /></Form.Item>
        </Form>
      </Modal>
      
      <Modal
        title="系统公告"
        open={isAnnouncementModalVisible}
        onOk={() => setIsAnnouncementModalVisible(false)}
        onCancel={() => setIsAnnouncementModalVisible(false)}
        okText="知道了"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>园区项目治理流程文档请点击右上角链接查看。</p>
      </Modal>
    </Layout>
  );
}

export default App;