import React from 'react'

interface InputProps {
    name: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
}

function Input(props: InputProps) {

    const { name, type, placeholder, value, onChange } = props;

  return (
    <input 
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className='w-full p-6 rounded-[6px] border h-[40px] border border-[#E1E7EF] focus-visible:outline-0'
    />
  )
}

export default Input;