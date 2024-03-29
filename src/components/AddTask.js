import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault() 
        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, day, reminder})

        setText('')
        setDay('')
        setReminder(false)
    }
    return (
        <form className= 'add-form' onSubmit = {onSubmit}>
            <div className='form-control'>
                <label htmlFor="Task">Task</label>
                <input 
                    type='text' 
                    checked={reminder}
                    placeholder='Add task' 
                    value = {text} onChange={(e)=>setText(e.target.value)}
                /> 
            </div>
            <div className='form-control'>
                <label htmlFor="Task">Day and Time</label>
                <input 
                    type='text' 
                    placeholder='Add day and time'
                    value = {day} onChange={(e)=>setDay(e.target.value)}
                    /> 
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor="Task">Set reminder</label>
                <input 
                    type='checkbox'
                    value = {reminder} onChange={(e)=>setReminder(e.currentTarget.checked)} 
                /> 
            </div>

            <input type="submit" value='Save task' className = 'btn btn-block'/>
        </form>
    )
}

export default AddTask
