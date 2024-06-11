/* eslint-disable react/prop-types */
import './App.css'
import { useState } from "react"
import MultipleSelectTree from './multi-select-tree/MultiSelectTree'


function App() {
  const items = [
    {
      label: "Option 1",
      value: "option1",
      children: [
        {
          label: "Option 1.1",
          value: "option1.1"
        },
        {
          label: "Option 1.2",
          value: "option1.2"
        }
      ]
    },
    {
      label: "Option 2",
      value: "option2",
      children: [
        {
          label: "Option 2.1",
          value: "option2.1"
        },
        {
          label: "Option 2.2",
          value: "option2.2"
        },
        {
          label: "Option 2.3",
          value: "option2.3"
        }
      ]
    },
    {
      label: "Option 3",
      value: "option3",
      children: [
        {
          label: "Option 3.1",
          value: "option3.1"
        },
        {
          label: "Option 3.2",
          value: "option3.2"
        },
        {
          label: "Option 3.3",
          value: "option3.3"
        },
        {
          label: "Option 3.4",
          value: "option3.4"
        }
      ]
    }
  ]
  const [selectedList, setSelectedList] = useState([])


  return (
    <div className="flex justify-center items-center min-h-screen">
      <MultipleSelectTree
        options={items}
        selectedList={selectedList}
        onChangeSelectedList={setSelectedList}
      />
    </div>
  )
}

export default App
