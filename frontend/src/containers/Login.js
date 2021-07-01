import logo from "../img/Logo.png"
import React from "react"
import { useState, useEffect } from "react"
import { Input, Button } from "antd"
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
//import CreateModal from "../components/CreateModal"

const LOCALSTORAGE_KEY = "save-username";

function Login({ handleLogin, displayStatus, pets }) {

    const savedUserName = localStorage.getItem(LOCALSTORAGE_KEY);

    const [userName, setUserName] = useState(savedUserName || '');
    const [password, setPassword] = useState('');
    //const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_KEY, userName);
    }, [userName]);

    return (
        <div className="login__main" >

            <img className="login__logo" src={logo} ></img>

            {/*
            <CreateModal 
                pets={pets}
                visible={modalVisible}
                displayStatus={displayStatus}
                onCreate={({ name, password }) => { setModalVisible(false); }}
                onCancel={() => { setModalVisible(false); }}
            />*/
            }

            <div className="login__items" >
                <Input 
                    className="login__userName" value={userName}
                    onChange={(e) =>
                        setUserName(e.target.value)} 
                    size="large" placeholder="user name..." 
                    prefix={<PersonOutlineOutlinedIcon />} 
                />
                <br></br>
                <Input.Password
                    className="login__password" value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    size="large" placeholder="password..." 
                    prefix={<VpnKeyOutlinedIcon />} 
                />
                <br></br><br></br>
            </div>
            <div className="login__buttons" >
                <Button className="login__register" size="large" style={{justifyContent:"right"}}
                    onClick={() => {
                        //setModalVisible(true)
                        if (!userName) {
                            displayStatus({
                                type: "error",
                                msg: "Please enter user name.",
                            })
                        } else if (!password) {
                            displayStatus({
                                type: "error",
                                msg: "Please enter password.",
                            })
                        }else{
                            handleLogin(userName,password,true)
                        }

                    }} >Register</Button>

                <Button className="login__submit" size="large" style={{justifyContent:"right"}}
                    onClick={() => {
                        if (!userName) {
                            displayStatus({
                                type: "error",
                                msg: "Please enter user name.",
                            })
                        } else if (!password) {
                            displayStatus({
                                type: "error",
                                msg: "Please enter password.",
                            })
                        }else{
                            handleLogin(userName,password,false)
                        }
                         
                }} >Login</Button>
            </div>

            
            <img className="login__pet login__pet1" src={pets['1']['4']} ></img>
            <img className="login__pet login__pet2" src={pets['2']['4']} ></img>
            <img className="login__pet login__pet3" src={pets['3']['4']} ></img>
            
        </div>
    )
}

export default Login;
