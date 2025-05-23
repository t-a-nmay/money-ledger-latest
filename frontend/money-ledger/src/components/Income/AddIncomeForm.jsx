import React, { useState } from 'react'
import Input from '../../components/Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const[income,setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:""
    });
    const handleChange=(key,value)=>setIncome({
        ...income,[key]:value
    })
  return (
    <div>
        <EmojiPickerPopup
            icon={income.icon}
            onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
        />

      <Input
        Value={income.source}
        onChange={({target})=>handleChange("source",target.value)}
        Label="Income Source"
        placeHolder='Freelance, Salary,etc.'
        inputType='text'
      />

      <Input
        Value={income.amount}
        onChange={({target})=>handleChange("amount",target.value)}
        Label="Amount"
        placeHolder=''
        inputType='number'
      />

      <Input
        Value={income.date}
        onChange={({target})=>handleChange("date",target.value)}
        Label="Date"
        placeHolder=''
        inputType="date"
      />

      <div className="flex justify-end mt-6">
        <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={()=>onAddIncome(income)}
        >
            Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm
