import { Modal, Form, Input, message } from 'antd'

const GoalSetter = ({visible, onSet, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <Modal  visible={visible}
            title="Set New Goal for This Week"
            okText="Set" cancelText="Cancel"
            onOk={() => {
              form.validateFields().then((values) => {
                onSet(values)
                form.resetFields()
              }).catch((e) => (message.error({content:'Invalid/Empty Goal Label', duration:3, style: { fontSize: '20px', fontFamily: 'monospace'}})))
            }}
            onCancel={onCancel}
    >
      <Form form={form} layout='vertical' name='createEvent'>
        <Form.Item name='name' label="Goal Label" rules={[{required: true}]}>
          <Input autoFocus="true"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default GoalSetter