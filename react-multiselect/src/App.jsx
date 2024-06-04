import './App.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MultipleSelect from './multiselect/MultipleSelect'

const schema = yup.object().shape({
  select: yup.array().min(1, 'Select at least one item')
})


function App() {
  const [selectedList, setSelectedList] = useState([])
  const { handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  setValue('select', selectedList)

  const data = [
    { label: 'Checkbox 1', value: 'checkbox1' },
    { label: 'Checkbox 2', value: 'checkbox2' },
    { label: 'Checkbox 3', value: 'checkbox3' },
    { label: 'Checkbox 4', value: 'checkbox4' },
    { label: 'Checkbox 5', value: 'checkbox5' },
    { label: 'Checkbox 6', value: 'checkbox6' },
    { label: 'Checkbox 7', value: 'checkbox7' },
    { label: 'Checkbox 8', value: 'checkbox8' },
    { label: 'Checkbox 9', value: 'checkbox9' },
    { label: 'Checkbox 10', value: 'checkbox10' }
  ]

  const handleForm = (data) => {
    console.log(data)
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div>
        <MultipleSelect
          selectedList={selectedList}
          options={data}
          onChangeSelectedList={(value) => {
            setSelectedList(value);
            setValue('select', value)
          }}
        />
        {
          errors?.select &&
          <p className='text-red-500'>
            {errors.select?.message || 'Select at least one item'}
          </p>
        }
      </div>
      <button className='ml-4' onClick={handleSubmit(handleForm)}>Submit</button>
    </div>
  )
}

export default App
