import React,{ useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export default function Home() {
  const [user, setUser] = useState('')
  
  const timeOptions = [
    {value:'1', label:'1 month'},
    {value:'2', label:'2 months'},
    {value:'3', label:'3 months'},
    {value:'4', label:'4 months'}
  ]
  
  const sizeOptions = [
    {value:'2', label:'2x2'},
    {value:'3', label:'3x3'},
    {value:'4', label:'4x4'}
  ]
  
  const [size, setSize] = useState(sizeOptions[1])
  const [time, setTime] = useState(timeOptions[1])

  
  const changeUser = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value)
  }
  const isDisabled = ((user === '') ||  (size.value === '') || (time.value === ''))

  const handleRedirect = () => {
    window.location.href = `/collage?user=${user}&size=${size.value}&time=${time.value}`;
  };

  return (
    <main className="w-full bg-[#171a20] h-screen flex flex-col items-center ">
      <p className=' text-6xl mt-36 lg:mt-72 text-center font-bold text-[#bcbcc4]'>Letterboxd Collage</p>
      <div className='flex flex-col py-24 w-1/2 justify-center items-center'>
        <div className='flex flex-col lg:mb-8 mb-0 lg:flex-row '>
          <input className='p-2 h-fit w-60 outline-none font-normal lg:mb-0 mb-4 rounded-sm text-[#0e1013] mx-2' placeholder='Letterboxd username' value={user} onChange={changeUser}/>
          <Dropdown className='mx-2 mb-4 lg:mb-0 w-60' value={size} onChange={(e)=>setSize(e)} options={sizeOptions}/>
          <Dropdown className='mx-2 mb-4 lg:mb-0 w-60' value={time} onChange={(e)=>setTime(e)} options={timeOptions}/>

        </div>

        <button 
        type='button' 
        disabled={isDisabled} 
        onClick={handleRedirect}
        className={`${isDisabled ? "bg-neutral-500 text-neutral-300 cursor-default" : "bg-green-500 hover:bg-green-400 active:bg-green-600"} font-medium p-2 w-60 rounded`}> 
          Generate Collage
        </button>
      </div>
      <div className='font-normal text-[#bcbcc4]'>
        <p>Made by <a className='text-green-500 hover:text-green-400 duration-500 ease-in-out hover:underline' href="https://renandantas.xyz">Renan Dantas</a></p>
      </div>
    </main>
  )
}