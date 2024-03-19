'use client'
import Image from "next/image";
import axios from 'axios';
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import RedAlert from "@/app/components/RedAlert";
export default function Home() {
  const [cnpj , setCnpj] = useState('');
  const [name , setName] = useState('');
  const [password , setPassword] = useState('');
  const [alertClass , setAlertClass] = useState('hidden')
  const [alert , setAlert] = useState('');
  const router = useRouter();

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
      console.log(name , password , cnpj)
      axios.post('http://localhost:8082/api/auth/register' , {name , cnpj , password})
      .then((res) => {
        console.log(res.data);
        router.push('/auth/login')
      }).catch((err) => {
        console.log(err.response.data.msg);
        setAlert(err.response.data.msg)
        setAlertClass('');
      })
    }

  }
  return (
    
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Store Registration Form
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <RedAlert alert={alert} alertClass={alertClass}/>
            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleValue}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
