import React,{useState,useEffect} from 'react'

import {v4 as uuidv4} from 'uuid'
import TaskItem from './components/TaskItem/index'
import TagItem from './components/TagItem/index'
import './App.css'


const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]


const  App  = () =>  {
  const [task,setTask] = useState('')
  const [tag,setTag] = useState(tagsList[0].optionId);
  const [selectedTag,setActiveTag]  = useState('')
  const [taskList,setTaskList] = useState([])
  const [errorMsg,setErrorMsg] = useState('')
  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem('taskList'))
    
    if (storedTask !== null){
      console.log(storedTask)
      setTaskList(prevTaskList => ([...prevTaskList,...storedTask]))
    } 
    
   },[])

  useEffect(() => {
    localStorage.setItem('taskList' , JSON.stringify(taskList))
  },[taskList])
  const onDeleteTask = (id) => {
    const updatedTaskList = taskList.filter(eachTask => (eachTask.id !== id))
    setTaskList(updatedTaskList)
  }
  const onSavingTask = event => {
    event.preventDefault()
    if(task !== '' ){
      const tagText = tagsList.filter(eachTag => eachTag.optionId === tag)
      const taskItem = {
        tagName: tagText[0].displayText,
        taskName: task,
        id: uuidv4(),
        categoryId: tag,
      }
  
      setTaskList(prevTaskList => ([...prevTaskList, taskItem]))
      setTask('')
      setTag(tagsList[0].optionId)
      setErrorMsg('')
    } 
    else{
      setErrorMsg('Please enter Task name')
    }
    
  }
  const onSelectTag = id => {
    if (selectedTag === id) {
      setActiveTag('')
    } else {
      setActiveTag(id)
    }
  }
  const renderForm = () => {
    return (
      <form className="form-container" onSubmit={onSavingTask}>
        <h1 className="form-heading">Create a task!</h1>
        <div style={{marginBottom : '20px'}}>
          <label htmlFor="task" className="label">
            Task
          </label>{' '}
          <br />
          <input
            id="task"
            type="text"
            className="task-input"
            onChange={(e) => (setTask(e.target.value))}
            placeholder="Enter the task here"
            value={task}
          />
          <p style={{color : 'red' , fontSize : '15px',margin : '0px'}}>{errorMsg}</p>
        </div>
        <div>
          <label htmlFor="tags" className="label">
            Tags
          </label>{' '}
          <br />
          <select
            id="tags"
            className="tags-dropdown"
            onChange={(e) => (setTag(e.target.value))}
            value={tag}
          >
            {tagsList.map(eachTag => (
              <option value={eachTag.optionId}>{eachTag.displayText}</option>
            ))}
          </select>
        </div>
        <div style={{textAlign : 'center'}}>
          <button type="submit" className="add-task-btn">
            Add Task
          </button>
        </div>
      </form>
    )
  }
  const renderTags = () => {
    return (
      <div className="tags-container">
        <h1>Tags</h1>
        <ul className="all-tags-items">
          {tagsList.map(eachTag => (
            <TagItem
              tagDetails={eachTag}
              onSelectTag={onSelectTag}
              selectedTag={selectedTag}
              key={eachTag.optionId}
            />
          ))}
        </ul>
      </div>
    )
  }
  const getFilteredTaskList = taskList => {
    if (selectedTag === '') {
      return taskList
    } else {
      const updatedList = taskList.filter(
        eachTask => eachTask.categoryId === selectedTag,
      )
      return updatedList
    }
  }
  const renderTasks = () => {
    const filtredTasks = getFilteredTaskList(taskList)
    const isEmpty = taskList.length === 0
    return (
      <div>
        <h1>Tasks</h1>
        {isEmpty ? (
          <div style={{display: 'flex',alignItems:'center',justifyContent: 'center' ,height : '30%'}}>
            <p style={{fontWeight: '700',fontSize : '25px'}}>No Tasks Added Yet</p>
          </div>
          
        ) : (
          <ul className="tasks-list-container">
            {filtredTasks.map(eachTask => (
            <TaskItem taskDetails={eachTask} onDeleteTask = {onDeleteTask} key={eachTask.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

    return (
      <div className="app-container">
        {renderForm()}
        <div className="dynamic-section-container">
          {renderTags()}
          {renderTasks()}
        </div>
      </div>
    )
  
}

export default App