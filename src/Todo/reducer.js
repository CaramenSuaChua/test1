import { SET_TODO, ADD_TODO, DELETE_TODO } from './constant'


const initState = {
    todo: '',
    todoList: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_TODO:
            return {
                ...state,
                todo: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            }
        case DELETE_TODO:

            const newTodo = [...state.todoList]

            newTodo.splice(action.payload, 1 )
            return {
                ...state,
                todoList: newTodo
                }
        default:
            throw new Error('Invalid ')
    }
}


export { initState }
export default reducer