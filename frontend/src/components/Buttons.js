import React from "react"
import { Button } from 'antd'
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
// import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';

function Buttons( { sliderVisible, savedTime, setLeftTime, setSliderVisible, timeStatus, setTimeStatus }) {

	let content;
	if (timeStatus === 0) content = (
		<Button className="podomon__button" shape="circle" icon={
			<PlayArrowRoundedIcon className="material-icons" color="primary" />
		} 
		disabled={!sliderVisible} 
		onClick={ () => {
			setTimeStatus(1);
			setSliderVisible(false);
		}} ></Button>
	) 
	else if (timeStatus === 1) content = (
		<Button className="podomon__button" shape="circle" icon={
			<PauseRoundedIcon className="material-icons" color="primary" />
		} onClick={()=>setTimeStatus(2)}></Button>
	) 
	else content = (
		<>
			<Button className="podomon__button" shape="circle" icon={
				<StopRoundedIcon className="material-icons" color="primary" />
			} onClick={ () => {
				setTimeStatus(0);
				setSliderVisible(true);
				setLeftTime(savedTime);
			}} ></Button>
			<Button className="podomon__button" shape="circle" icon={
				<PlayArrowRoundedIcon className="material-icons" color="primary" />
			} onClick={()=>setTimeStatus(1)}></Button>
			
		</>
	)

    return (
        <div className="podomon__buttons" >
        	{content}
        </div>
    )
};


export default Buttons;