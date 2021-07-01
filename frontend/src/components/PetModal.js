import { Modal, Input, Select } from "antd";
import React from "react"
import { useState } from "react"

const PetModal = ({ me,visible, setPetModalVisible, pets, handlePet, displayStatus }) => {

	const text = "You have to choose one as your pet."

	const { Option } = Select;
	const [showText, setShowText] = useState(false)
	const [kind, setKind] = useState(0)
	const [petName, setPetName] = useState('')

	const handleChange = (value) => {
		setKind(value)
	  	console.log(`selected ${value}`);
	}

	return (
		
		<Modal
			visible={visible}
			title="Choose your pet!"
			okText="I have decided!"
			cancelText="Cancel"
			onCancel={() => {
				setShowText(true)
				setTimeout(()=>{ setShowText(false) }, 5000)
			}}
			onOk={(values) => { // i don't know how to get value at here...
				// console.log(values)
				if (!kind) {
                    displayStatus({
                        type: "error",
                        msg: text,
                    })
				} else if(! petName){
					displayStatus({
                        type: "error",
                        msg: "You should make a name for your pet!",
                    })
				} else {
					handlePet(me.name,kind*10+1,petName)
					setPetModalVisible(false);
				}
			}} >
			<div className="podomon__register__pet__and__set" >

	            <br></br>
				<div className="podomon__register__set" >
				    <Select defaultValue="0" style={{ width: 120 }} onChange={handleChange}>
				      <Option value="1">1</Option>
				      <Option value="2">2</Option>
				      <Option value="3">3</Option>
				    </Select>

				    <Input 
	                    className="podomon__register__petname__input" value={petName}
	                    onChange={(e) =>
	                        setPetName(e.target.value)} 
	                    size="large" placeholder="pet name..." 
	                />
	            </div>

				<div className="podomon__register__pet" >
			        <h1 className="podomon__register__pet__kind" >1<img src={pets[1][1]} ></img></h1>
			        <h1 className="podomon__register__pet__kind" >2<img src={pets[2][1]} style={{transform:"scale(0.8)",}} ></img></h1>
			        <h1 className="podomon__register__pet__kind" >3<img src={pets[3][1]} ></img></h1>
			    </div>
			</div>
			{showText? (<p className="podomon__pet__text" >{text}</p>) : (<></>)}
	    </Modal>
	); 
};

export default PetModal;
