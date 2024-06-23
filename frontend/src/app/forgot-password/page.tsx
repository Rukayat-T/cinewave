"use client"
import { useState } from "react";
import Link from 'next/link'

function page() {
    const [formData, setFormData] = useState({
        email : "",
    })
    return (
        <div className="bg-slate-600 w-full h-[100vh]">
            <Link href={"/"} className="text-[2vw] pl-5">CineWave</Link>
        <div className="h-[90vh] flex items-center justify-end">

        <div className="bg-white min-w-[28vw] min-h-[30vh] mr-[18vw] rounded-xl p-[3rem]">
            <div className="form pt-2">
                {/* <div className="flex justify-between items-center mb-7">
                <p className="text-[2vw]">Log In</p>
                <p className="underline"><Link href={"/register"}>Sign Up</Link></p>
                </div> */}
            
                
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
                    className="h-[4vh] bg-slate-500 text-white rounded-md"
                    />
                </div>
               
                <input type="button" value={"Send Link"} className="h-[4vh] bg-slate-500 text-white text-[1.2rem] mt-5 rounded-md" />
            </form>
            </div>
        </div>
        </div>
        </div>
    );
}

export default page;