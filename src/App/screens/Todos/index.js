import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntitiesOne, getEntitiesTwo, getActive } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

const activeList = function(id, active) {
    if (active === id) return 'dib dim f4 center pa2 bg-light-gray'
    else  return 'dib dim f4 center pa2'
}

const Todos = ({ todoOne, todoTwo, active, addTodo, toggleTodo, filterEntity, setActive }) => {
  return (
    <section className='pa3 pa5-ns'>
        <ul className = 'center mw6'>
            <li className = {activeList(1, active)} onClick = {() => setActive(1)}>List 1</li>
            <li className = {activeList(2, active)} onClick = {() => setActive(2)}>List 2</li>
        </ul>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo, active)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>
      <h1 className='f4 bold center mw6'>Filter Todos</h1>
      <ul className = 'center mw6 bb'>
          <li className = 'dib dim f4 center pa2' onClick = {() => filterEntity(null)}>All</li>
          <li className = 'dib dim f4 center pa2' onClick = {() => filterEntity(false)}>Active</li>
          <li className = 'dib dim f4 center pa2' onClick = {() => filterEntity(true)}>Completed </li>
      </ul>
      <div className = 'center mw6 relative'>
          <div className = "dib w-50 absolute top-5 left-0">
              <h2 className='f4 bold center mw6'>List 1</h2>
              <TodoList {...{ todoOne, toggleTodo, id: 1}}/>
          </div>
          <div className = "dib w-50 absolute top-5 right-0">
              <h2 className='f4 bold center mw6'>List 2</h2>
              <TodoList {...{ todoTwo, toggleTodo, id: 2}}/>
          </div>
      </div>
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default connect(
  state => ({
      todoOne: getEntitiesOne('todos')(state),
      todoTwo: getEntitiesTwo('todos')(state),
      active: getActive('todos')(state)
  }),
  dispatch => ({
    addTodo: (text, listID) => dispatch(actions.submitEntity({text, listID}, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'})),
    filterEntity: (filtered) => dispatch(actions.filterEntity({filtered}, {type: 'todos'})),
    setActive: (active) => dispatch(actions.setActive({active}, {type: 'todos'}))

  })
)(Todos)
