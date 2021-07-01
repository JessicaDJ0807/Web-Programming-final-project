import React from "react"
import { useState, useEffect } from "react"
import { Slider, Button, notification } from 'antd'
import TodoList from "../components/TodoList"
import Buttons from "../components/Buttons"
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SettingDrawer from "../components/SettingDrawer"
import PetModal from "../components/PetModal"
import axios from '../api';
import dialog from '../img/dialog.png'
import { FrownTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons'

function Podomon({ pets, me, setMe, displayStatus }) {
    window.onbeforeunload = () => ("Work unfinished... Plz stay >///<")
    const [timeStatus, setTimeStatus] = useState(0); // 0, 1, 2
    const [settingVisible, setSettingVisible] = useState(false);
   // const [focusedTime, setFocusedTime] = useState(0); // second
    const [leftTime, setLeftTime] = useState(3600)
    const [savedTime, setSavedTime] = useState(3600)
    const [sliderVisible, setSliderVisible] = useState(true)
    const [finishFocusing, setFinishFocusing] = useState(false)

    const cheerText = "You got this!"
    const congratText = "Congrats!"

    const transformTime = (time) => {
        let sec = time % 60;
        let min = Math.floor(time / 60) % 60;
        let hr = Math.floor(time / 3600) % 24;
        let day = Math.floor(time / 86400) % 7;
        let week = Math.floor(time / 604800);
        return { week, day, hr, min, sec };
    }

    const openNotification = (type, box) => {
        notification[type] (box)
    }

    const updateFocusTime = async (username, new_time) => {
        const { data: { type, message, user } } = await axios.post('/api/update-focustime', {
            username,
            new_time
        })

        if (type === "success") {
            delete user.password
            setMe(user)
        }
        const noticebox = {
            message: 'Focus Time Updated！',
            description: message,
            duration: 0,
            icon: <SmileTwoTone twoToneColor="#52c41a" />,
            style: {
                fontSize: 'xx-large',
                width: 'auto',
                fontFamily: 'monospace',
                boxShadow: 'black 0px 2px 1px'
            }
        }
        openNotification('success', noticebox)
    }

    const petEvolution = async (username, newPet) => {
        const { data : { type, message, user } } = await axios.post('/api/pet-evolution', {
            username,
            new_pet: newPet
        })

        if (type === "success") {
            delete user.password
            setMe(user)
        }
        const notifybox = {
            message: 'Level Up！',
            description: message,
            duration: 0,
            icon: <HeartTwoTone twoToneColor="#eb2f96" />,
            style: {
                fontSize: 'xx-large',
                width: 'auto',
                fontFamily: 'monospace',
                boxShadow: 'black 0px 2px 1px'
            } 
        }
        openNotification(type, notifybox)
    }

    const evolutionChecker = (time, level) => {
        //const lv2 = 86399
        //const lv3 = 431999
        const lv2 = 100
        const lv3 = 800
        console.log(me.name, me.pet, time, level)
        if (level === 1 && time > lv2) {
            petEvolution(me.name, me.pet+1)
        }
        if (level === 2 && time > lv3) {
            petEvolution(me.name, me.pet+1)
        }
    }

    useEffect(() => {
        if (timeStatus === 1) {
            if (leftTime === 0) {
                console.log('finish!')
                const newTime = me.focusedTime + savedTime
                //setFocusedTime(newTime)
                setTimeStatus(0)
                setLeftTime(savedTime)
                setFinishFocusing(true)
                updateFocusTime(me.name, newTime)
                evolutionChecker(newTime, me.pet%10)   
            }
            else {
                window.setTimeout(() => {
                    setLeftTime(leftTime-1);
                }, 1000);
            }
        }
    }, [leftTime, timeStatus])
    //onBlur part but so many bug TT
    useEffect(() => {
        const handleBlur = () => {
            if (leftTime > 2) {
                setTimeStatus(2)
                console.log(leftTime, 'sec left')
                const alertbox = {
                    message: 'Please Stay Focus！！！😡😡😡',
                    duration: 0, description: 'You can do better...',
                    icon: <FrownTwoTone twoToneColor='red'/>,
                    style: {
                        fontSize: 'xx-large',
                        width: 'auto',
                        fontFamily: 'monospace',
                        boxShadow: 'black 0px 2px 2px'
                    }
                }
                openNotification('error', alertbox)
            }
        }
        if (timeStatus === 1) {
            window.addEventListener('blur', handleBlur, true)
        }
        return () => {
            window.removeEventListener('blur', handleBlur, true)
        }
    }, [leftTime, timeStatus])
    
    return (
        <div className="podomon__main" >


            <TodoList me={me} setMe={setMe} displayStatus={displayStatus}/>
            <SettingDrawer
                visible={settingVisible}
                onClose={() => { setSettingVisible(false) }}
                pet={pets[parseInt(me.pet / 10)][me.pet % 10]} petName={me.petname}
                level={me.pet % 10} focusedTime={transformTime(me.focusedTime)} seconds={me.focusedTime} />
            <div className="podomon__main__right" >

                <div className="podomon__main__upper__right">
                    <Button
                        className="podomon__settings"
                        type="link" shape="circle" icon={<SettingsRoundedIcon />}
                        onClick={() => { setSettingVisible(true) }}
                    ></Button>
                    <div className="podomon__time" >
                        <h1>
                            { Math.floor(leftTime/3600)? Math.floor(leftTime/3600)+':' : '' }
                            { Math.floor(Math.floor(leftTime%3600/60)/10)? Math.floor(leftTime%3600/60) : '0'+Math.floor(leftTime%3600/60) }:
                            { Math.floor(leftTime%60/10)? leftTime%60 : '0'+leftTime%60 }
                        </h1>
                    </div>

                </div>
                <div className="podomon__main__middle__right">
                    {sliderVisible? 
                        <Slider
                            className="podomon__main__slider"
                            min={5} max={120} step={5} defaultValue={savedTime/60} tipFormatter={(e) => `${e} minutes`}
                            onChange={(e) => { 
                                setLeftTime(e*60);
                                setSavedTime(e*60);
                            }}
                        /> :
                        <>
                            {finishFocusing? 
                                <>
                                    <img className="podomon__main__dialog" src={dialog} ></img>
                                    <div className="podomon__main__dialog__text" >
                                        <h1>{congratText}</h1>
                                        <Button
                                            className="podomon__dialog__button"
                                            type="danger" shape="round"
                                            onClick={() => { 
                                                setSliderVisible(true)
                                                setFinishFocusing(false)
                                            }}
                                        >thanks!</Button>
                                    </div>
                                </> :
                                <>
                                    <img className="podomon__main__dialog" src={dialog} ></img>
                                    <div className="podomon__main__dialog__text" ><h1>{cheerText}</h1></div>
                                </>
                            }
                        </>
                    }
                </div>
                <div className="podomon__main__buttom__right">
                    <img className="podomon__main__pet" src={pets[parseInt(me.pet / 10)][me.pet % 10]} ></img>
                    <Buttons sliderVisible={sliderVisible} savedTime={savedTime} setLeftTime={setLeftTime} setSliderVisible={setSliderVisible} timeStatus={timeStatus} setTimeStatus={setTimeStatus} />
                </div>
            </div>
        </div>
    )
}


export default Podomon
