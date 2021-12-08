import React, {useState, useEffect} from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
const TodoList = () => {
    
    const initialState = JSON.parse(localStorage.getItem('todos')) || []
    
    const [todos, setTodos] = useState(initialState)
    
    useEffect(() => {
       
        localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])
    
    let localData = localStorage.getItem('todos')

    
    const addTodo = (todo) => {
        // prevents empty todo
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos)

    }

    const completeTodo = (id) => {
        let updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
            console.log('clicked')
        }
        return todo;
    });
        setTodos(updatedTodos);
      };

    const removeTodo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
    }

    const updateTodo = (todoId, newValue,) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }

        setTodos((prev) => prev.map(item => (item.id === todoId ? newValue : item)))
    }
 
    return (
        <div>
            <h1>What's the plan for today?</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList
