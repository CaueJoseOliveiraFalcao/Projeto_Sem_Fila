'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import RedAlert from "@/app/components/RedAlert";
import style from '../auth.module.css'
export default function Home() {

  const router = useRouter();
  const [cnpj , setCnpj] = useState('');
  const [password , setPassword] = useState('');
  const [alertClass , setAlertClass] = useState('hidden')
  const [alert , setAlert] = useState('');




  const validCnpj = (cnpj : string) => {
    cnpj = cnpj.replace(/\D/g, '')

    if (cnpj.length !== 14){
      return false
    }
    return true

  }

  const handleValue = (e  :any) => {
    e.preventDefault();
    const isValid = validCnpj(cnpj)
    setAlertClass('hidden');
    if(isValid === false){
      setAlert('Cnpj Informado Invaido')
      setAlertClass('');
    }
    else{
      axios.post('http://localhost:8082/api/auth/login' , {cnpj , password})
      .then((res) => {
        localStorage.setItem("wait-App:token" , res.data.accessToken);
        const dataConverted = JSON.stringify(res.data.data);
        localStorage.setItem("wait-App:user" ,  dataConverted);
        router.push('/StoreDashboard');
      }).catch((err) => {
        setAlert(err.response.data.msg)
        setAlertClass('');
      })
    }
  }

  return (
    
    <div className="flex  flex-col justify-center items-center h-screen">
      <div className={style.main_div} >
      <div className="flex justify-center items-center flex-col w-full">
                <Image
                src="/mascote_icone.png"
                width={200}
                height={200}
                alt="Picture of the author"
                />
            </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight ">
            Login de Lojas
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <RedAlert alert={alert} alertClass={alertClass}/>
            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium leading-6 ">
                CNPJ
              </label>
              <div className="mt-2">
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  pattern="[0-9]"
                  maxLength={14}
                  onChange={(e) => setCnpj(e.target.value)}
                  max={11}
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> 
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                  password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleValue}
                className="flex w-full justify-center rounded-md bg-indigo-600  py-2 mb-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Logar
              </button>
            </div>
            <a href="/auth/register" className="underline" >Sem Registro?</a>
          </form>
        </div>
      </div> 
      </div>
  );}
