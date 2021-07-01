import { Button, Collapse, List } from 'antd'
import { useState } from 'react'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import GoalSetter from '../../modals/goalSetter'
const { Panel } = Collapse

const GoalBoard = ({me,addGoal,removeGoal}) => {
  
  const [setterVisible, setSetterVisible] = useState(false)
  const onSet = (e) => {
    addGoal(e.name)
    setSetterVisible(false)
  }
  const onCancel = () => {setSetterVisible(false)}
  const addExtra = () => {
    return (
      <div onClick={(e) => {e.stopPropagation()}}>
        <Button size='small'>
          <PlusOutlined onClick={() => {setSetterVisible(true)}} />
        </Button>
      </div>  
    )
  }
  const closeExtra = (id) => {
    return (
      <div className="closeButton" >
      <Button id={id} onClick={() => {
        removeGoal(id)
      }} 
        icon={<CloseOutlined style={{fontSize: "12px"}} />}
        shape="circle"
        type="primary"
        size="small"
        danger
      />
      </div>
    )
  }
  const goalList = (list) => {
    if (list[0] != undefined) {
      return (
        <List dataSource={list}
          bordered
          renderItem={item => (
            <List.Item style={{fontSize:'large', fontFamily:'monospace'}} id={item._id.valueOf()} extra={closeExtra(item._id.valueOf())}>
              {item.name}
            </List.Item>
          )}
        />
      )
    } else {
      return (
        <div className='alert__box'>
          <p className='empty__alert'>No goal available now!</p>
        </div>
      )
    }
  }
  return (
    <>
      <Collapse ghost>
        <Panel header="Weekly Goals" key="goals" extra={addExtra()}>
          {goalList(me.goals)}
        </Panel>
      </Collapse>
      <GoalSetter visible={setterVisible} onCancel={onCancel} onSet={onSet} />
    </>
  )
}

export default GoalBoard