import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

export default function TestForm() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开测试表单</Button>
      <Modal
        open={open}
        onOk={async () => {
          try {
            const values = await form.validateFields();
            alert(JSON.stringify(values));
          } catch (e) {}
        }}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" name="test_form">
          <Form.Item name="test" label="测试字段" rules={[{ required: true, message: '请输入内容' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}