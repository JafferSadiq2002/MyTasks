import './index.css'
import React from 'react'

const TaskItem = props => {
  const {taskDetails,onDeleteTask} = props
  const onClickDelete  =  () => {
    onDeleteTask(taskDetails.id)
  }
  return (
    <li className="task-item">
      <button type='button' className='delete-button' onClick = {onClickDelete}>X</button>
      <div className='task-details-container'>
        <p style={{fontSize : '20px',fontWeight : '600',margin : '0px'}}>{taskDetails.taskName}</p>
        <p className="task-item-tag">{taskDetails.tagName}</p>
      </div>
      
    </li>
  )
}

export default TaskItem
