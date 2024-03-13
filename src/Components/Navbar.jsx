// import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-1 text-center text-lg' >
    <div className="logo mx-8 flex gap-4 my-2">
        <img src="/todologo.svg" alt="logo" className="my-auto" />  
        <h1 className="text-center my-auto">Itask</h1>
    </div>
    <ul className="flex gap-8 mx-8">
        <li className="cursor-pointer hover:font-bold my-auto">Home</li>
        <li className="cursor-pointer hover:font-bold my-auto ">About</li>
    </ul>
    </nav>
  )
}
