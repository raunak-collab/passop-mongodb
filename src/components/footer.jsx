import React from 'react'

const footer = () => {
    return (
        <div className='bg-slate-800 p-1 text-white flex flex-col justify-center items-center w-full'>
            <div className="logo font-bold text-[22px] ">
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>

            <div className='flex my-1 text-[16px] font-medium'>
                Created With  <img width={20} className='invert mx-2' src="icons/heart.svg" alt="" />  by Raunak Bro
            </div>

        </div>
    )
}

export default footer