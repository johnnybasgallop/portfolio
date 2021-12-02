import React, {useReducer, createContext} from 'react'
import contextReducer from './contextReducer'

const initialState = JSON.parse(localStorage.getItem('transactions')) || []
export const ExpenseTrackerContext = createContext(initialState)

export const Provider = (props) => {
    const {children} = props
    
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    const deleteTransaction = (id) => {
        dispatch({type: 'DELETE_TRANSACTION', payload: id})
    }

    const addTransaction = (transaction) => {
        dispatch({type: 'ADD_TRANSACTION', payload: transaction})    
    }

    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount)
    }, 0)

    console.log(transactions)


    return(
        <ExpenseTrackerContext.Provider value= {{           
            deleteTransaction: deleteTransaction,
            addTransaction: addTransaction,
            transactions: transactions,
            balance: balance,
        }} >{children}</ExpenseTrackerContext.Provider>
    )
}                           