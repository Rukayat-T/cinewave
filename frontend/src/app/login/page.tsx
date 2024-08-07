"use client";
import { useState } from "react";
import Link from "next/link";
import { CreateUserDto } from "@/models/onboarding.model";
import AuthorizationServices from "@/services/AuthServices/auth.service";
import { toast } from "react-toastify";
import CookieManager from "@/utils/cookie_manager";
import { useRouter } from "next/navigation";

function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const notify = (message: string) => toast(message);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const data: CreateUserDto = {
        email: formData.email,
        password: formData.password,
      };
      const log = await AuthorizationServices.LoginUser(data);
      if (log.status === 200) {
        notify(log.message);
        CookieManager.setCookie("token", log.jwt);
        router.push("/");
      } else {
        notify(log.message);
      }
    } catch (error) {
      notify("you don't deserve to watch feem!");
    }
  };

  return (
    <div className='bg-slate-600 w-full h-[100vh] bg-moviesImage'>
      <Link href={"/"} className='text-[2vw] text-white pl-5'>
        CineWave
      </Link>
      <div className='h-[90vh] flex items-center justify-end mr-[15vw]'>
        <div className='bg-white min-w-[28vw] min-h-[50vh]  rounded-xl p-[3rem]'>
          <div className='form pt-2'>
            <div className='flex justify-between items-center mb-7'>
              <p className='text-[2vw]'>Log In</p>
              <p className='underline'>
                <Link href={"/register"}>Sign Up</Link>
              </p>
            </div>

            <form action='' onSubmit={onSubmit} className=' flex flex-col gap-y-5'>
              <div className='flex flex-col'>
                <label className='text-[1.5rem]' htmlFor='email'>
                  Email:
                </label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                  required
                  className='h-[4vh] bg-slate-200 rounded-md p-2'
                />
              </div>
              <div className=' flex flex-col'>
                <label htmlFor='password' className='text-[1.5rem]'>
                  Password:
                </label>
                <input
                  type='text'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                  required
                  className='h-[4vh] bg-slate-200 rounded-md p-2'
                />
              </div>
              <div className=''>
                <Link href={"/forgot-password"} className='underline'>
                  Forgot Password
                </Link>
                ?
              </div>
              <input type='submit' value={"Log In"} className='h-fit bg-black py-1 text-white text-[1.2rem] rounded-md' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
