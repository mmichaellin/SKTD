import React from 'react'

const Task = props => {
  const {id, title, completeButton, deleteButton} = props
  return (
    <div>
      {`${id}) ${title} `}
      {completeButton ? (
        <button onClick={() => completeButton(id)}>✔️</button>
      ) : null}
      <button onClick={() => deleteButton(id)}>❌</button>
    </div>
  )
}

export default Task
