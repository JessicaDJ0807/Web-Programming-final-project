import { Modal, Form, Input, message } from 'antd'

const TaskSetter = ({visible, onCreate, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <Modal  visible={visible}
            title="Create Task for Today"
            okText="Create" cancelText="Cancel"
            onOk={() => {
              form.validateFields().then((values) => {
                onCreate(values)
                form.resetFields()
                //message.success({content:'Task added!', duration: 2})
              }).catch((e) => (message.error({content:'Invalid/Empty Task Name', duration:3, style: { fontSize: '20px', fontFamily: 'monospace'}})))
            }}
            onCancel={onCancel}
    >
      <Form form={form} layout='vertical' name='createEvent'>
        <Form.Item name='name' label="Task Name" rules={[{required: true}]}>
          <Input autoFocus="true"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TaskSetter