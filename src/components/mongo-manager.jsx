import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()
    const showpass = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eye.svg")) {
            ref.current.src = "icons/eyeclose.svg"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = "password"
        }

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            setpasswordArray([...passwordArray, newPassword]);
            setform({ site: "", username: "", password: "" });

            // if any such id exists in db, delete it
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id: form.id }) })


            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            alert("Please enter the required details.");
        }
    };



    const deletePassword = async (id) => {
        let c = confirm("Are you sure you want delete this")
        if (c) {
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("Deleting Password With id " + id)
            setpasswordArray(passwordArray.filter(item => item.id !== id));
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        }
    }
    const editPassword = (id) => {
        console.log("Editing Password With id " + id)
        setform({...passwordArray.filter(item => item.id === id)[0], id: id});
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)

    }




    useEffect(() => {
        getPassword()
    }, [])

    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }






    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className="md:my-container min-h-[80vh] p-4">
                <h2 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h2>
                <p className='text-green-500 text-center py-2 text-lg'>Your Own Password Manager</p>
                <div className="input-field flex flex-col gap-5 p-4  items-center text-black">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='w-full rounded-full px-4 border border-green-600 py-1' type="text" id='site' name='site' />
                    <div className='flex md:flex-row flex-col w-full gap-[16px]'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='w-full rounded-full px-4 border border-green-600 py-1' type="text" id='username' name='username' />
                        <div className='relative md:w-[50%]'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='w-full rounded-full px-5 border border-green-600 py-1' type="password" id='password' name='password' />
                            <span onClick={showpass} className='absolute right-[12px] cursor-pointer top-[7px]'>
                                <img width={19} ref={ref} src="icons/eye.svg" alt="eye" />
                            </span>

                        </div>

                    </div>

                    <button onClick={savePassword} className='flex gap-1 mt-3 justify-center items-center w-fit bg-green-400 hover:bg-green-500 rounded-full px-5 text-[17px] border font-bold py-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>

                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='text-2xl font-bold pb-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div> No Passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto overflow-hidden rounded-md w-full">
                        <thead className='bg-green-500 text-center'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item) => {
                                return <tr key={item.site}>
                                    <td className='border-white border py-2 text-center w-3'>
                                        <div className='flex gap-3 p-2 justify-center items-center'>
                                            <a href={item.site} target='_blank'> {item.site} </a>
                                            <div onClick={() => copytext(item.site)}>
                                                <img className='cursor-pointer' src="icons/copy.svg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border-white border py-2 text-center w-3'> <div className='flex gap-3 p-2 flex-wrap justify-center items-center'>
                                        {item.username}
                                        <div onClick={() => copytext(item.username)}>
                                            <img className='cursor-pointer' src="icons/copy.svg" alt="" />
                                        </div>
                                    </div></td>
                                    <td className='border-white border py-2 text-center w-3'> <div className='flex gap-3 p-2 justify-center items-center'>
                                        {"*".repeat(item.password.length)}
                                        <div onClick={() => copytext(item.password)}>
                                            <img className='cursor-pointer' src="icons/copy.svg" alt="" />
                                        </div>
                                    </div></td>
                                    <td className='Actions border-white border py-2 text-center w-3'> <div className='flex gap-3 justify-center items-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span className='EditPassword cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='deletePassword cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </div></td>

                                </tr>
                            })}


                        </tbody>
                    </table>}


                </div>

            </div>

        </>
    )
}

export default Manager