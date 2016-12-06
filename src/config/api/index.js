import { v4 } from 'node-uuid'

const fakeDB = {
  lists: [],
  todos: []
}

const apiResponse = ({
  ok = true,
  problem = 'NONE',
  data = {}
} = {}) => ({
  ok, problem, data
})

const api = {
  post: (path, data) => {
    if (path.match(/list/g)) {
      const list = createList(data)

      fakeDB.lists.push(list)

      return apiResponse({data: { list }})
    } else {
      const todo = createTodo(data)

      fakeDB.todos.push(todo)

      return apiResponse({data: { todo }})
    }
  },

  put: (path, data) => {
    const id = path.split('/')[2]

    let todo = fakeDB.todos.find(i => i.id === id)

    if (typeof todo === 'undefined') {
      todo = createTodo({...data, id})
    } else {
      Object.keys(data).map(key => {
        todo[key] = data[key]
      })
    }

    return apiResponse({data: { todo }})
  }
}

export default api

/*
 * Factories
 */

function createList (data) {
  return Object.assign({}, {
    id: v4(),
    createdAt: new Date()
  }, data)
}

function createTodo (data) {
  return Object.assign({}, {
    id: v4(),
    createdAt: new Date(),
    completed: false
  }, data)
}
