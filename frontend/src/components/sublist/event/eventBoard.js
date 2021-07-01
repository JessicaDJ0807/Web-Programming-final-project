import { Button, Collapse } from 'antd'
import EventCard from './eventCard'
import { useState } from 'react'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import EventSetter from '../../modals/eventSetter'

const { Panel } = Collapse

const genComp = (date, time) => {
  const mon = date.getMonth()
  const dy = date.getDate()
  const hr = time.getHours()
  const min = time.getMinutes()
  return mon * 1000000 + dy * 10000 + hr * 100 + min
}
const compByTime = (a, b) => (a.compSec - b.compSec)

const EventReminder = ({ me, addEvent, removeEvent }) => {
  //const [events, setEvent] = useState([])
  const [eventGenVisible, setEventgenVisible] = useState(false)
  const addExtra = (func) => {
    return (
      <div onClick={(e) => { e.stopPropagation() }} >
        <Button size='small'>
          <PlusOutlined onClick={func} />
        </Button>
      </div>
    )
  }
  const closeExtra = (id) => {
    return (
      <Button className="closeButton" id={id} onClick={() => {
        removeEvent(id)
      }}
        icon={<CloseOutlined style={{ fontSize: "12px" }} />}
        shape="circle"
        type="primary"
        size="small"
        danger
      />
    )
  }
  const showEventGen = () => { setEventgenVisible(true) }
  const solveDate = (time) => {
    const date = time._d.toLocaleString('en-us', { month: 'short', day: 'numeric' })
    return date
  }
  const solveTime = (time) => {
    const t = time._d.toLocaleString('en-us', { hour: '2-digit', minute: '2-digit' })
    return t
  }
  const onEventCreation = (info) => {
    console.log(info)
    addEvent(
      info.color.hex,
      genComp(info.date._d, info.time._d),
      solveDate(info.date),
      info.tag,
      solveTime(info.time),
    )
    setEventgenVisible(false)
  }
  const onCreatCancel = () => { setEventgenVisible(false) }
  const eventMap = (cards) => {
    if (cards[0] !== undefined) {
      return (
        <div className="events" style={{width:"500px", display: 'flex', overflowX:"auto"}}>
          {cards.map((e) => (<EventCard tag={e.tag} date={e.date} time={e.time} color={e.color} id={e._id.valueOf()} extra={closeExtra(e._id.valueOf())} />))}
        </div>
      )
    } else {
      return (
        <div className='alert__box'>
          <p className='empty__alert'>No event available now!</p>
        </div>
      )
    }
  }
  return (
    <>
      <Collapse ghost>
        <Panel header="Event Reminder" key="events" extra={addExtra(showEventGen)}>
          {eventMap(me.events.sort(compByTime))}
        </Panel>
      </Collapse>
      <EventSetter visible={eventGenVisible} onCreate={onEventCreation} onCancel={onCreatCancel} />
    </>
  )
}

export default EventReminder