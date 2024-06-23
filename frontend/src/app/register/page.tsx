"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import AuthorizationServices from "@/services/AuthServices/auth.service";
import { CreateUserDto } from "@/models/onboarding.model";
import { useRouter } from "next/navigation";
import CookieManager from "@/utils/cookie_manager";
import Image from "next/image";
import logoW from "../../../public/images/logoW.png";

function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  const router = useRouter();
  const notify = (message: string) => toast(message);

  const checkPassword = (password1: string, password2: string) => {
    if (password1 !== password2) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!checkPassword) notify("e equal men!");

    try {
      const data: CreateUserDto = {
        email: formData.email,
        password: formData.password1,
      };
      const response = await AuthorizationServices.CreateUser(data);
      if (response.status !== 200) {
        notify(response.message);
      } else {
        const log = await AuthorizationServices.LoginUser(data);
        if (log.status !== 200) {
          notify(log.message);
        } else {
          notify("you can watch feem!");

          CookieManager.setCookie("token", log?.jwt);
          router.push("/");
        }
      }
    } catch (error) {
      notify("you don't deserve to watch feem!");
    }
  };

  return (
    <div className='bg-slate-600 w-full h-[100vh] bg-moviesImage'>
      <Link href={"/"} className='text-[2vw] text-white'>
        <Image className='mx-4 mt-4 cursor-pointer' src={logoW} alt='cinewave' width={200} height={200} />
      </Link>
      <div className='h-[90vh] flex items-center justify-end mr-[15vw]'>
        <div className='bg-white min-w-[28vw] min-h-[50vh]  rounded-xl pt-[1rem] p-10'>
          <div className='form pt-2'>
            <div className='flex justify-between items-center mb-7'>
              <p className='text-[2vw]'>Sign Up</p>
              <p className='underline'>
                <Link href={"/login"}>Log In</Link>
              </p>
            </div>

            <form action='' className=' flex flex-col gap-y-5' onSubmit={onSubmit}>
              <div className='flex flex-col'>
                <label className='text-[1.2rem]' htmlFor='email'>
                  Email:
                </label>
                <input
                  type='email'
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
                <label htmlFor='password1' className='text-[1.2rem]'>
                  Password:
                </label>
                <input
                  type='password'
                  id='password1'
                  name='password1'
                  value={formData.password1}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password1: e.target.value,
                    });
                  }}
                  required
                  className='h-[4vh] bg-slate-200 rounded-md p-2'
                />
              </div>
              <div className=' flex flex-col'>
                <label htmlFor='password2' className='text-[1.2rem]'>
                  Confirm password:
                </label>
                <input
                  type='password'
                  id='password2'
                  name='password2'
                  value={formData.password2}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password2: e.target.value,
                    });
                  }}
                  required
                  className='h-[4vh] bg-slate-200 rounded-md p-2'
                />
              </div>
              <input type='submit' value={"Sign Up"} className='h-fit bg-black py-1 text-white text-[1.2rem] mt-2 rounded-md' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
