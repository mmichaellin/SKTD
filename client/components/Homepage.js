import React, {Component} from 'react'
import axios from 'axios'
import Task from './Task'

export default class Homepage extends Component {
  constructor() {
    super()
    this.state = {
      list: [],
      value: '',
      count: 1,
      showCompleted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.completeButton = this.completeButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
  }
  async componentDidMount() {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      )
      this.setState({
        list: this.state.list.concat([
          {
            id: this.state.count,
            text: res.data.title,
            completed: false
          }
        ])
      })
    } catch (err) {
      console.error(err)
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    if(this.state.value !== ''){
      this.setState({
        count: this.state.count + 1,
        list: this.state.list.concat([
          {
            id: this.state.count + 1,
            text: this.state.value,
            completed: false
          }
        ]),
        value: ''
      })
    }
  }
  completeButton(key) {
    let updatedList = this.state.list
    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i].id == key) {
        updatedList[i].completed = true
      }
    }
    this.setState({
      list: updatedList,
      showCompleted: true
    })
  }
  deleteButton(key) {
    let updatedList = this.state.list
    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i].id == key) {
        updatedList[i].completed = true
        updatedList = updatedList.slice(0, i).concat(updatedList.slice(i+1))
      }
    }
    this.setState({
      list: updatedList
    })
    let completeCounter = 0
    for (let i = 0; i < this.state.list.length; i++){
      if(this.state.list[i].completed == true){
        completeCounter++
      }
    }
    if (completeCounter < 2){
      this.setState({
        showCompleted: false
      })
    }
  }
  render() {
    return (
      <div>
        <h1 id="title" >To-Do List</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
            className={'text-box'}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Add todo"
            />
          </label>
          <input type="submit" value="Add"/>
        </form>
        {this.state.list
          .filter(element => !element.completed)
          .map((element, idx) => (
            <Task
              key={idx}
              id={element.id}
              title={element.text}
              completeButton={this.completeButton}
              deleteButton={this.deleteButton}
            />
          ))}
        {this.state.showCompleted ? (
          <div>
            <h2>Completed</h2>
            {this.state.list
              .filter(element => element.completed)
              .map((element, idx) => (
                <Task
                  key={idx}
                  id={element.id}
                  title={element.text}
                  deleteButton={this.deleteButton}
                  completed={element.completed}
                />
              ))}
          </div>
        ) : null}
      </div>
    )
  }
}
