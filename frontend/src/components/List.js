import { useState } from 'react'
import EventReminder from './sublist/event/eventBoard'
import GoalBoard from './sublist/goal/GoalBoard'
import TaskBoard from './sublist/task/taskBoard'

import axios from "../api"

const List = ({ me, setMe, displayStatus }) => {
  const [goals, setGoals] = useState(["Goal1"])

  var username = me.name

  const addTask = async (name, goal_id) => {
    const { data: { type, message, user } } = await axios.post("/api/add-task", {
      username,
      name,
      goal_id
    })
    if (type === "success") {
      delete user.password
      setMe(user)
    }
    displayStatus({ msg: message, type })

  }

  const removeTask = async (task_id, goal_id) => {
    const { data: { type, message, user } } = await axios.post("/api/remove-task", {
      username,
      task_id,
      goal_id
    })
    if (type === "success") {
      delete user.password
      setMe(user)
    }
    displayStatus({ msg: message, type })

  }

  const modifyTask = async (task_id, goal_id) => {
    const { data: { type, message, user } } = await axios.post("/api/modify-task", {
      username,
      task_id,
      goal_id
    })
    if (type === "success") {
      delete user.password
      setMe(user)
    }else
      displayStatus({ msg: message, type })

  }

  const addEvent = async (color, compSec, date, tag, time) => {
    const { data: { type, message, user } } = await axios.post("/api/add-event", {
      username,
      color, compSec, date, tag, time
    })
    console.log(user)
    if (type === "success") {
      delete user.password
      setMe(user)
    }
    displayStatus({ msg: message, type })
  }

  const removeEvent = async (event_id) => {
    const { data: { type, message, user } } = await axios.post("/api/remove-event", {
      username,
      event_id
    })
    if (type === "success") {
      delete user.password
      setMe(user)
    }
    displayStatus({ msg: message, type })

  }

  const addGoal = async (name) => {
    const { data: { type, message, user } } = await axios.post("/api/add-goal", {
      username,
      name
    })
    if (type === "success") {
      delete user.password
      setMe(user)
    }
    displayStatus({ msg: message, type })

  }

  const removeGoal = async (goal_id) => {
    const { data: { type, message, user } } = await axios.post("/api/remove-goal", {
      username,
      goal_id
    })
    if (type === "success") {
      delete user.password
      setMe(user)
    }
    displayStatus({ msg: message, type })

  }



  return (
    <>
      <EventReminder me={me} addEvent={addEvent} removeEvent={removeEvent} />
      <GoalBoard me={me} addGoal={addGoal} removeGoal={removeGoal} />
      {<TaskBoard me={me} addTask={addTask} removeTask={removeTask} modifyTask={modifyTask}/>}
    </>
  )
}

export default List