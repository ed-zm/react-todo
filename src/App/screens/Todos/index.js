import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
const completed = "completed"
const active = "active"
const Todos = ({ todos, addTodo, toggleTodo, filterEntity }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>
      <h1 className='f4 bold center mw6'>Filter Todos</h1>
      <ul className = "center mw6 bb">
          <li className = "dib dim f4 center pa2" onClick = {() => filterEntity(null)}>All</li>
          <li className = "dib dim f4 center pa2" onClick = {() => filterEntity(false)}>Active</li>
          <li className = "dib dim f4 center pa2" onClick = {() => filterEntity(true)}>Completed </li>
      </ul>
      <TodoList {...{ todos, toggleTodo }} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default connect(
  state => ({todos: getEntities('todos')(state)}),
  dispatch => ({
    addTodo: (text) => dispatch(actions.submitEntity({ text }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'})),
    filterEntity: (filtered) => dispatch(actions.filterEntity({filtered}, {type: 'todos'}))

  })
)(Todos)
