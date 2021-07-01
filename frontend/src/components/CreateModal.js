import { Modal, Form, Input, Button } from 'antd';
import { useState } from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateModal = ({ visible, onCreate, onCancel, displayStatus, pets }) => {

  const [form] = Form.useForm();

  return (        
		<Modal
			visible={visible}
			title="Create a new Podomon account"
			okText="Create"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {

				// i still don't know how to get the value of user name and password...
				form.validateFields().then((username, password) => { // it seems that these two params aren't working
					console.log(form)
					onCreate(username, password);
					form.resetFields();
				}).catch(e => { window.alert('All blanks should be filled.'); })
				//
			}}>

		    <Form
		    form={form}
		      {...layout}
		      name="basic"
		    >
		      <Form.Item
		      	form={form}
		        label="Username"
		        name="username"
		        rules={[
		          {
		            required: true,
		            message: 'Please input your username!',
		          },
		        ]}
		      >
		        <Input />
		      </Form.Item>

		      <Form.Item
		      	form={form}
		        label="Password"
		        name="password"
		        rules={[
		          {
		            required: true,
		            message: 'Please input your password!',
		          },
		        ]}
		      >
		        <Input.Password />
		      </Form.Item>
		    </Form>
	
	    </Modal>
	); 
};

export default CreateModal;