import { Modal, Form, Input, message } from 'antd'

const SubtaskSetter = ({visible, onCreate, onCancel, goal}) => {
  const [form] = Form.useForm();
  return (
    <Modal  visible={visible}
            title={`Create Subtask --- ${goal}`}
            okText="Set" cancelText="Cancel"
            onOk={() => {
              form.validateFields().then((values) => {
                onCreate(values)
                form.resetFields()
              }).catch((e) => (message.error({content:'Invalid/Empty Subtask Name', duration:3, style: { fontSize: '20px', fontFamily: 'monospace'}})))
            }}
            onCancel={onCancel}
    >
      <Form form={form} layout='vertical' name='createEvent'>
        <Form.Item name='name' label="Subtask Name" rules={[{required: true}]}>
          <Input autoFocus="true"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SubtaskSetter