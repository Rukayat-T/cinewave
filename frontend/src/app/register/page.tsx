"use client"
import { useState } from "react";
import Link from 'next/link'

function page() {
    const [formData, setFormData] = useState({
        email : "",
        password: ""
    })
    return (
        <div className="bg-slate-600 w-full h-[100vh] bg-moviesImage">
            <Link href={"/"} className="text-[2vw] text-white pl-5">CineWave</Link>
        <div className="h-[90vh] flex items-center justify-end mr-[15vw]">

        <div className="bg-white min-w-[28vw] min-h-[50vh]  rounded-xl p-[3rem]">
            <div className="form pt-2">
                <div className="flex justify-between items-center mb-7">
                <p className="text-[2vw]">Sign Up</p>
                <p className="underline"><Link href={"/login"}>Log In</Link></p>
                </div>
            
                
            <form action="" className=" flex flex-col gap-y-5">
                <div className="flex flex-col">
                    <label className="text-[1.5rem]" htmlFor="email">Email:</label>
                    <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                    required
                    className="h-[4vh] bg-slate-200 rounded-md p-2"
                    />
                </div>
                <div className=" flex flex-col">
                <label htmlFor="password" className="text-[1.5rem]">Password:</label>
                <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                required
                className="h-[4vh] bg-slate-200 rounded-md p-2"
                />
                </div>
                <input type="button" value={"Sign Up"} className="h-fit bg-black py-1 text-white text-[1.2rem] mt-5 rounded-md" />
            </form>
            </div>
        </div>
        </div>
        </div>
    );
}

export default page;