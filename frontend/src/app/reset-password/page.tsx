"use client"
import { useState } from "react";
import Link from 'next/link'

function page() {
    const [formData, setFormData] = useState({
        password1: "",
        password2 : ""
    })
    return (
        <div className="bg-slate-600 w-full h-[100vh] bg-moviesImage">
            <Link href={"/"} className="text-[2vw] text-white pl-5">CineWave</Link>
        <div className="h-[90vh] flex items-center justify-end mr-[15vw]">

        <div className="bg-white min-w-[28vw] min-h-[30vh]  rounded-xl p-[3rem]">
            <div className="form pt-2">
                <div className="flex justify-between items-center mb-7">
                <p className="text-[2vw]">Reset your Password</p>
                </div>
            
                
            <form action="" className=" flex flex-col gap-y-5">
                <div className="flex flex-col">
                    <label className="text-[1.2rem]" htmlFor="password1">Password:</label>
                    <input
                    type="text"
                    id="password1"
                    name="password1"
                    value={formData.password1}
                    onChange={(e) => { setFormData({ ...formData, password1: e.target.value }) }}
                    required
                    className="h-[4vh] bg-slate-200 rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-[1.2rem]" htmlFor="password1">Confirm Password:</label>
                    <input
                    type="text"
                    id="password2"
                    name="password2"
                    value={formData.password2}
                    onChange={(e) => { setFormData({ ...formData, password2: e.target.value }) }}
                    required
                    className="h-[4vh] bg-slate-200 rounded-md p-2"
                    />
                </div>
                <input type="button" value={"Reset"} className="h-fit bg-black py-1 text-white text-[1.2rem] mt-2 rounded-md" />
            </form>
            </div>
        </div>
        </div>
        </div>
    );
}

export default page;