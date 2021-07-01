import { Drawer, Form, Input } from "antd";

const SettingDrawer = ({ visible, onClose, pet, petName, level, focusedTime: {week, day, hr, min, sec}, seconds }) => {

	let compliment;
	if (week) compliment = "You are wonderful!"
	else if (day) compliment = "Your efforts will eventually pay off."
	else if (hr) compliment = "What a great job!"
	else compliment = "Keep going!"

	let weekText;
	if (week && week === '1') weekText = '1 week ';
	else if (week) weekText = week+' weeks ';
	else weekText = '';

	let dayText;
	if (day && day === '1') dayText = '1 day ';
	else if (day) dayText = day+' days ';
	else dayText = '';

	let hrText;
	if (hr && hr === '1') hrText = '1 hour ';
	else if (hr) hrText = hr+' hours ';
	else hrText = '';

	let minText;
	if (min && min === '1') minText = '1 minute';
	else if (min) minText = min+' minutes';
	else minText = '';

	return (
		<Drawer
			className="podomon__setting__drawer"
			visible={visible}
			width="500px"
			keyboard="true" // can use esc to close
			drawerStyle={{backgroundColor: "#ffd666",}}
			onClose={onClose}
			>
			<h1>This is your pet <b>{petName}</b>!</h1>
			<h2> {petName} is at <b>level {level}</b>. </h2>
			<br /><br />
			<img className="podomon__setting__pet" src={pet} ></img>
			<br /><br /><br /><br />
			<h2> You have focused for&nbsp;
				<b>
					{weekText}
					{dayText}
					{hrText}
					{minText}
					{seconds? "" : sec+' second'}
				</b>. 
			</h2>
			<h2>{compliment}</h2>
	    </Drawer>
	); 
};

export default SettingDrawer;