import 'antd/dist/antd.css'
import List from './List'

function TodoList({me,setMe,displayStatus}) {
  return (
    <div className="todo__main" style={{overflowY:'auto'}}>
      <List me={me} setMe={setMe} displayStatus={displayStatus}/>
    </div>
  );
}

export default TodoList;