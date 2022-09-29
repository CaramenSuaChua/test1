import {ADD_TODO, SET_TODO, DELETE_TODO} from './constant'

export const setTodo = payload => ({
        type: SET_TODO,
        payload
})

export const addTodo = payload => ({
    type: ADD_TODO,
    payload
})

export const deleteTodo = payload => ({
    type: DELETE_TODO,
    payload
})