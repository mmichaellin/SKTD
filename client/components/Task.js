import React from 'react'

const Task = props => {
  const {id, title, completeButton, deleteButton, completed} = props
  return (
    <div className={'task-container'}>
      <span
        className={completed ? 'completed text-left' : 'text-left'}
      >{`${id}) ${title} `}</span>
      <div className={'button-container'}>
        {completeButton ? (
          <button onClick={() => completeButton(id)} className={'btn'}>
            ✓
          </button>
        ) : null}
        <button onClick={() => deleteButton(id)} className={'btn'}>
          ✖
        </button>
      </div>
    </div>
  )
}

export default Task
