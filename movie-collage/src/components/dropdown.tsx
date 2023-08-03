import { SetStateAction, useEffect, useState } from 'react'
import type {Dispatch} from 'react'

interface Option {
  value: string
  label: string
}

interface Props {
  type : string
  value : string | null
  changeFunction: Dispatch<SetStateAction<string>>
  options : Option[] 
}

export default function Dropdown({type, value, changeFunction, options}: Props){
  const [dropdownButton, setDropdownButton] = useState(false)
  const [label, setLabel] = useState("")

  useEffect(()=> {

  }, [dropdownButton])

  const clickButton = () => {
    setDropdownButton(!dropdownButton)
  }

  const setValue = (option:Option) => {
    changeFunction(option.value)
    setLabel(option.label)
    clickButton()
  }

  return(
    <div className="flex flex-col lg:mb-0 mb-4">
      <button onClick={clickButton} className='flex flex-row mr-4'>
        <div className='p-1 h-fit outline-none font-normal rounded-l w-full lg:w-20 items-center flex bg-[#0e1013] '>
          {value ? <p className='text-[#c2c4c7]'>{label} </p> : <p className='text-[#555c64]'>{type}</p>}
        </div>
        <div className='px-1 pt-1.5 pb-0.5 font-normal h-fit rounded-r w-8 bg-[#363c44]'>
          { !dropdownButton ? <p className=''>⌄</p> : <p className=''>⌃</p>}
        </div>
      </button>
      <div className={`${dropdownButton? 'absolute flex flex-col' : 'hidden'} w-[7rem] bg-neutral-200 mt-10 rounded`}>
          {options.map(option => 
            <button key={option.label} onClick={() => setValue(option)}  className="text-neutral-700 hover:bg-green-500 hover:text-white rounded font-normal" >{option.label}</button>)
          }
      </div>
    </div>
  )
}