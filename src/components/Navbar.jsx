import React from 'react'


const navbar = () => {
    return (
        <>
            <nav className='bg-slate-800'>
                <div className="my-container flex justify-between text-white py-7 px-4 items-center h-14">
                    <div className="logo font-bold text-[22px]">
                        <span className='text-green-500'>&lt;</span>
                        Pass
                        <span className='text-green-500'>OP/&gt;</span>
                    </div>

                    <button className= 'rounded-full py-[1px] px-[4px] flex items-center gap-[3px] bg-green-600 ring-white ring-1 '>
                       <img width={30} className=' invert p-1' src="icons/github.svg" alt="github" />

                       <span className='p-1 font-bold text-[16px]'>GitHub</span>
                    </button>

                </div>
            </nav>
        </>
    )
}

export default navbar