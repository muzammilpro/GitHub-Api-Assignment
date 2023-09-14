"use client"




import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios'

export default function Home() {
    const [data, setData] = useState([])
    const [userName, setUserName] = useState('')
    const [Followers, setFollowers] = useState([])
    const [FollowersUser, setFollowersUser] = useState([])
    const Searching = async () => {
        if (userName) {
            let response = await fetch(`https://api.github.com/users/${userName}`)
            response = await response.json()
            setData(response)
            setFollowers([]);
            console.log(response)
        }
        else {
            alert('Enter Data')
        }
    }
    const searchUser = async (e) => {
        setUserName(e.target.value)
    }

    const getFollowers = async (e) => {
        try {
            let bit = await fetch(data.followers_url)
            bit = await bit.json()
            setFollowers(bit)
            console.log(bit)
        }
        catch (error) {
            alert(error)
        }

    }
    const FollowersFollowers = async (e) => {
        let response = await fetch(`https://api.github.com/users/${e}`)
        response = await response.json()
        setData(response)
        setFollowers([]);
        console.log(response)
    }


    return (

        <div>
            <div className='max-w-full py-16 px-4 mt-20' >
                <div className='max-w-7xl bg-white mx-auto'>
                    <div>
                        <h1 className='text-center text-4xl font-semibold animate-pulse  ' >Get GitHub Users</h1>
                        <div className='bg-white shadow-lg p-4' >
                            <label htmlFor="user" className="text-lg font-semibold mb-2" >Enter UserName</label>
                            <div className="flex items-center flex-col sm:flex-row gap-2 my-2">
                                <input type="text" name="user" id="user" placeholder='Enter user' className="px-6 py-2 bg-slate-200 rounded hover:bg-slate-100 focus:outline-none  focus:border-blue-500 flex-grow "
                                    onChange={searchUser} />
                                <button className='w-40 h-10 px-11 bg-slate-400 rounded hover:bg-slate-200 ' onClick={Searching}>Search</button>
                            </div>
                        </div>
                        {userName &&
                            <>
                                <div className=' max-w-7xl  mx-auto bg-slate-400  rounded-t-lg border-2 border-slate-700 mt-2 p-4' >
                                    <div className='flex justify-between flex-col sm:flex-row'>
                                        <div className='flex items-center mx-auto sm:mx-0'>
                                            <div className='w-16 h-16 px-2 py-2  '>
                                                <img src={data.avatar_url} width={100} alt="" className='w-[100%] h-[100%] object-cover rounded-full flex-wrap' />
                                            </div>
                                            <p className='font-semibold text-2xl'>{data.login}</p>
                                            <div>
                                            </div>
                                        </div>
                                        <p className='font-semibold my-auto text-2xl '>{data.bio ? data.bio : 'No Bio'}</p>
                                        <button onClick={getFollowers} className='bg-white rounded-2xl h-10 px-2 mt-3 mx-4 hover:bg-slate-500 active:bg-white duration-100 ease-in  focus:outline-none'>Get Followers</button>

                                    </div>
                                </div>
                            </>
                        }
                        <h1 className='text-center text-4xl font-semibold animate-pulse my-4 ' >Get Followers</h1>
                        <div className='max-w-7xl grid grid-cols-1 sm:grid-cols-4 px-4 gap-4 mt-4 '>
                            <p className='hidden' ></p>
                            {Followers.length >= 1 &&
                                <>
                                    {Followers.map((ele, i) => {
                                        return (
                                            <div key={i}>
                                                <div className="bg-white rounded-lg shadow-lg p-4 hover:bg-blue-100">
                                                    <h3 className='my-1 pt-3 text-2xl font-semibold'>{i + 1}</h3>
                                                    <img width={70} className=' w-16 h-16 rounded-full mx-auto' src={ele.avatar_url} alt="" />
                                                    <div className='text-center ' >
                                                        <h3 className='text-lg font-semibold text-blue-400'>{ele.login}</h3>
                                                        <a
                                                            href={ele.html_url}
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            {ele.html_url}
                                                        </a>
                                                        <span className='text-center pb-4 ' >
                                                            {/* <Button  txt={'Start Now'}/> */}
                                                        </span>
                                                        <div>
                                                            <button className=' h-10 my-4 px-8 bg-blue-400 rounded hover:bg-blue-200 ' onClick={() => { FollowersFollowers(ele.login) }}>Get Followers</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}