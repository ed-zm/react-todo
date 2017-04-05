import React, { PropTypes } from 'react'

import Todo from '../Todo'

const sortByDate = (arr) => arr.sort((a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.createdAt) - new Date(a.createdAt)
})

const TodoList = ({ todoOne, todoTwo, toggleTodo, id }) => {
    if ( id === 1) {
      const sortedTodos = todoOne && todoOne[0] ? sortByDate(todoOne) : null

      return (
        <ul className='list pl0 ml0 center mw6 ba b--light-silver br2 dib w-100'>
          {sortedTodos
            ? todoOne.map((todo, i) =>{

                return(
                  <Todo
                    key={i}
                    {...todo}
                    toggle={() => toggleTodo(todo, !todo.completed)}
                    isLast={(todoOne.length - 1) === i}
                    />)

            })
            : <p className='ph3 pv3 tc'>No todos Found found</p>
          }
        </ul>
      )
  } else {
      const sortedTodos = todoTwo && todoTwo[0] ? sortByDate(todoTwo) : null

      return (
        <ul className='list pl0 ml0 center mw6 ba b--light-silver br2 dib w-100'>
          {sortedTodos
            ? todoTwo.map((todo, i) =>{

                return(
                  <Todo
                    key={i}
                    {...todo}
                    toggle={() => toggleTodo(todo, !todo.completed)}
                    isLast={(todoTwo.length - 1) === i}
                    />)

            })
            : <p className='ph3 pv3 tc'>No todos Found found</p>
          }
        </ul>
      )
  }

}

TodoList.propTypes = {
  todoOne: PropTypes.array,
  todoTwo: PropTypes.array
}

export default TodoList
