import { useState } from 'react'
import Dropdown from '@/components/dropdown'

export default function Home() {
  const [user, setUser] = useState(null)
  const [size, setSize] = useState(null)
  const [time, setTime] = useState(null)

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
  
  const changeUser = (e) => {
    setUser(e.target.value)
  }
  const isDisabled = ((user === null) ||  (size === null) || (time === null))

  const handleRedirect = () => {
    // Replace 'target-url' with the URL you want to redirect to
    window.location.href = `/collage?user=${user}&size=${size}&time=${time}`;
  };

  return (
    <main className="w-full bg-[#171a20] h-screen font-bold flex flex-col items-center ">
      <p className=' text-6xl mt-72 text-center text-[#bcbcc4]'>Letterboxd Collage</p>
      <div className='flex flex-col lg:flex-row py-32 w-1/2 justify-center'>
        <input className='p-1 h-fit outline-none font-normal lg:mb-0 mb-4 rounded bg-[#0e1013] mr-4' placeholder='Letterboxd username' value={user} onChange={changeUser}/>
        <Dropdown type="Size" value={size} changeFunction={setSize} options={sizeOptions}/>
        <Dropdown type="Time" value={time} changeFunction={setTime} options={timeOptions}/>

        <button 
        type='button' 
        disabled={isDisabled} 
        onClick={handleRedirect}
        className={`${isDisabled ? "bg-neutral-500 text-neutral-300 opacity-50 cursor-default" : "bg-green-500 hover:bg-green-400 active:bg-green-600"} font-medium p-1 px-2 h-fit rounded`}> 
          Generate Collage
        </button>
      </div>
      <div className='font-normal text-[#bcbcc4]'>
        <p>Made by <a className='text-green-500 hover:text-green-400 duration-500 ease-in-out hover:underline' href="https://renandantas.xyz">Renan Dantas</a></p>
      </div>
    </main>
  )
}