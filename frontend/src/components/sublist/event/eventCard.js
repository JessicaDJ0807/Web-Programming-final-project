import { Card } from 'antd'

const fontColor = (color) => {
  if (color === '#ffeb3b') return '#8c8c8c'
  else return 'white'
}

const card = (props) => {
  const contentStyle = {
    margin: '5px',
    minWidth: '200px',
    borderRadius: '5px', 
    color:fontColor(props.color), 
    backgroundColor: props.color,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'left'
  }
  const titleStyle = {
    color:fontColor(props.color), 
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'left',
    textIndent: '5px',
  }
  console.log(props)
  return (
    <Card size="small" title={props.date} style={contentStyle} headStyle={titleStyle} extra={props.extra} >
      <p style={{fontSize:'25px', margin: '0px'}}>{props.tag}</p>
      <p style={{fontSize:'17px'}}>{props.time}</p>
    </Card>
  )
}

export default card