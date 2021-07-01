import { Collapse, List, Button, Select, Checkbox } from 'antd'
import { useState } from 'react'
import GoalSubs from './goalSubs'
import { PlusOutlined } from '@ant-design/icons'
import TaskSetter from '../../modals/taskSetter'
import './box.css'
const { Panel } = Collapse
const { Option } = Select

const TaskBoard = ({me,addTask,removeTask,modifyTask}) => {
  const [visible, setvisible] = useState(false)
  const [condition, setCondition] = useState('todo')
  const onCreate = (e) => {
    addTask(e.name)
    setvisible(false)
  }
  const onCancel = () => {setvisible(false)}
  const onSelect = (value) => {setCondition(value)}
  const addExtra = () => {
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Select defaultValue='todo' size='small' style={{marginRight:'15px', fontSize:'15px',width: 'auto'}} onChange={onSelect} >
          <Option value='todo'>Todo</Option>
          <Option value='all'>All</Option>
          <Option value='finished'>Finished</Option>
        </Select>
        <Button size='small'>
          <PlusOutlined onClick={() => {setvisible(true)}} />
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
    modifyTask(e.target.id)
  }
  const onClear = () => {

  }
  const taskList = (list) => {
    if (list[0] !== undefined) {
      return (
        <List dataSource={list}
          bordered 
          renderItem={item => (
            <List.Item>
              <Checkbox style={{color:'black', fontWeight:'550',fontSize:'large', fontFamily:'monospace'}} checked={item.finish} id={item._id.valueOf()} onChange={onCheck}>{item.name}</Checkbox>
            </List.Item>
          )}
        />
      )
    } else {
      return (
        <div className='alert__box'>
          <p className='empty__alert'>No task available now!</p>
        </div>
      )
    }
  }

  return (
    <>
      <Collapse className="task__collapse" ghost>
        <Panel className="task__board" header="Tasks Today" key="tasks" extra={addExtra()}>
          <div className="task__content">
          {me.goals.map((e) => (<GoalSubs addTask={addTask} removeTask={removeTask} modifyTask={modifyTask} goal={e} condition={condition} />))}
          {taskList(taskFilter(me.tasks, condition))}
          </div>     
        </Panel>
      </Collapse>
      <Button style={{
        position: "inherit", 
        top:'86%',
        left: '27%', 
        marginTop:"1%",
        textAlign:'center',
        backgroundColor: '#95de64',
        borderRadius: '5px',
        fontWeight:'bold', fontFamily:'monospace',
        color:'black',
        border: 'none'
        }}
        size='large'
        type='primary'
        onClick={()=>{removeTask()}}
        >Clear All Finished!</Button>
      <TaskSetter visible={visible} onCreate={onCreate} onCancel={onCancel} />
    </>
  )
}

export default TaskBoard