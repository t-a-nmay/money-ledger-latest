import React, { useState } from 'react'
import Input from '../../components/Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({onAddExpense}) => {
    const[expense,setExpense] = useState({
        category:"",
        amount:"",
        date:"",
        icon:""
    });
    const handleChange=(key,value)=>setExpense({
        ...expense,[key]:value
    })
  return (
    <div>
        <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
        />

      <Input
        Value={expense.category}
        onChange={({target})=>handleChange("category",target.value)}
        Label="Expense Category"
        placeHolder='Rent, Groceries,etc.'
        inputType='text'
      />

      <Input
        Value={expense.amount}
        onChange={({target})=>handleChange("amount",target.value)}
        Label="Amount"
        placeHolder=''
        inputType='number'
      />

      <Input
        Value={expense.date}
        onChange={({target})=>handleChange("date",target.value)}
        Label="Date"
        placeHolder=''
        inputType="date"
      />

      <div className="flex justify-end mt-6">
        <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={()=>onAddExpense(expense)}
        >
            Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm
