import { Collapse, List, Button, Checkbox } from 'antd'
import { useState } from 'react'
import SubtaskSetter from '../../modals/subTaskSetter'
import { PlusOutlined } from '@ant-design/icons'
const { Panel } = Collapse

const GoalSubs = ({ addTask, removeTask,modifyTask, goal, condition }) => {
  //const [subs, setSubs] = useState([])
  const [setterVisible, setsetterVisible] = useState(false)
  const onCreate = (e) => {
    addTask(e.name, goal._id.valueOf())
    setsetterVisible(false)
  }
  const onCancel = () => { setsetterVisible(false) }
  const addExtra = () => {
    return (
      <div onClick={(e) => { e.stopPropagation() }}>
        <Button size='small'>
          <PlusOutlined onClick={() => { setsetterVisible(true) }} />
        </Button>
      </div>
    )
  }
  const taskFilter = (list, cond) => {
    let filtered
    if (cond === 'finished') {
      filtered = list.filter((e) => (e.finish === true))
    } else if (cond === 'todo') {
      filtered = list.filter((e) => (e.finish === false))
    } else {
      return list
    }
    return filtered
  }
  const onCheck = (e) => {
    console.log(e)
    modifyTask(e.target.id,goal._id.valueOf())
  }
  const subList = (list) => {
    console.log(list)
    if (list[0] !== undefined) {
      return (
        <List dataSource={list}
          bordered
          renderItem={item => (
            <List.Item>
              <Checkbox style={{ color: 'black', fontWeight: '550', fontFamily: 'monospace', fontSize: 'large' }} id={item._id} checked={item.finish} onChange={onCheck}>
                {item.name}
              </Checkbox>
            </List.Item>
          )}
        />
      )
    } else {
      return (
        <div className='alert__box'>
          <p className='empty__alert'>No subtask available now!</p>
        </div>
      )
    }
  }

  return (
    <>
      <Collapse style={{ margin: '3px' }} ghost>
        <Panel header={goal.name} extra={addExtra()}>
          {subList(taskFilter(goal.subs, condition))}
        </Panel>
      </Collapse>
      <SubtaskSetter visible={setterVisible} onCreate={onCreate} onCancel={onCancel} goal={goal.name} />
    </>
  )
}

export default GoalSubs