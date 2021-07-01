import { useState } from "react";
import Login from "./containers/Login"
import Podomon from "./containers/Podomon"
import './App.css'
import 'antd/dist/antd.css'
import { message } from "antd"
import axios from "./api"
import PetModal from "./components/PetModal";

// import 寵物
import pet1_1 from "./img/1-1.png"
import pet1_2 from "./img/1-2.png"
import pet1_3 from "./img/1-3.png"
import pet1_4 from "./img/1-4.png"
import pet2_1 from "./img/2-1.png"
import pet2_2 from "./img/2-2.png"
import pet2_3 from "./img/2-3.png"
import pet2_4 from "./img/2-4.png"
import pet3_1 from "./img/3-1.png"
import pet3_2 from "./img/3-2.png"
import pet3_3 from "./img/3-3.png"
import pet3_4 from "./img/3-4.png"
import Password from "antd/lib/input/Password";

let pets = {
  1: { 1: pet1_1, 2: pet1_2, 3: pet1_3, 4: pet1_4 },
  2: { 1: pet2_1, 2: pet2_2, 3: pet2_3, 4: pet2_4 },
  3: { 1: pet3_1, 2: pet3_2, 3: pet3_3, 4: pet3_4 },
}

function App() {

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = { content: msg, duration: 3, style: { fontSize: '20px', fontFamily: 'monospace'} }
      switch (type) {
        case 'success':
          message.success(content) // message is an antd component
          break
        case 'warning':
          message.warning(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }

  const [isLogin, setLogin] = useState(false) //**default is FALSE! */
  const [me, setMe] = useState({})
  const [visible, setPetModalVisible] = useState(false)


  const handleLogin = async (username, password, isRegister) => {
    const { data: { type, message, user } } = await axios.post("/api/login", {
      username,
      password,
      isRegister
    })

    displayStatus({ type, msg: message })
    if (type === "success") {
      delete user.password
      setMe(user)
      console.log(user)
      if (user.pet === 0)
        setPetModalVisible(true)
      else
        setLogin(true)
    }

  }

  const handlePet = async (username, pet, petname) => {
    //console.log([username, pet])
    const { data: { type, message, user } } = await axios.post("/api/set-pet", {
      username,
      pet,
      petname
    })

    displayStatus({ type, msg: message })
    if (type === "success") {
      delete user.password
      setMe(user)
      console.log(user)
      setPetModalVisible(false)
      setLogin(true)
    }
  }


  return (
    <div className="App">
      <div className="innerApp">
        <PetModal
          me={me}
          visible={visible}
          setPetModalVisible={setPetModalVisible}
          pets={pets}
          handlePet={handlePet}
          displayStatus={displayStatus}
        />
        {isLogin ? <Podomon pets={pets} me={me} setMe={setMe} displayStatus={displayStatus} /> : <Login handleLogin={handleLogin} displayStatus={displayStatus} pets={pets} />}
      </div>

    </div>
  );
}

export default App;
