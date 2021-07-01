import { Modal, Form, Input, DatePicker, TimePicker, message } from 'antd'
import { CirclePicker } from 'react-color'

const EventSetter = ({visible, onCreate, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <Modal  visible={visible}
            title="Create New Event"
            okText="Create" cancelText="Cancel"
            onOk={() => {
              form.validateFields().then((values) => {
                console.log(values)
                onCreate(values)
                form.resetFields()
                //message.success({content: 'Event created!', duration:2})
              }).catch((e) => (message.error({content:'Must MISS something! Check your input AGAIN!', duration:3, style: { fontSize: '20px', fontFamily: 'monospace'}})))
            }}
            onCancel={onCancel}
    >
      <Form form={form} layout='vertical' name='createEvent'>
        <Form.Item name='tag' label="Event Name" rules={[{required: true}]}  >
          <Input autoFocus="true"/>
        </Form.Item>
        <Form.Item name='date' label="Date" rules={[{required: true}]}>
          <DatePicker/>
        </Form.Item>
        <Form.Item name='time' label="Time" rules={[{required: true}]}>
          <TimePicker minuteStep={5} format="HH:mm"/>
        </Form.Item>
        <Form.Item name='color' label="Event Color" rules={[{required: true}]}>
          <CirclePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EventSetter