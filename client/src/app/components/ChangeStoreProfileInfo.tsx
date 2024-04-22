import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
const ChangeStoreProfileInfo = () => {
    const user = localStorage.getItem('wait-App:user');
    const token = localStorage.getItem('wait-App:token');
    const convertedUser = JSON.parse(user);
    const [name , setName] = useState(convertedUser.name);
    const [store_desc , setDesc] = useState(convertedUser.store_desc);
    const router = useRouter();
    const Submit = (e: any) =>{
        e.preventDefault()
        axios.post('http://localhost:8082/api/store/changeInfo' , { name , store_desc} , {
            headers : {
                authorization : `${token}`
            }
        })
        .then((res) => {
            axios.get('http://localhost:8082/api/auth/logout')
            .then((res) => {
                if (res.status === 200){
                    localStorage.removeItem('wait-App:token');
                    localStorage.removeItem('wait-App:user');
                    router.push('/auth/login');
                }
            }).catch((error)=> {
                console.log(error);
            })   
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
            <div className="w-full sm:w-3/5 my-12">
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                        <p className="font-bold">Alerta</p>
                        <p>Apos Mudança de Nome ou Descrição sera Necessario Login </p>
                    </div>
                <form className="bg-white W shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="name">
                        Nome da Loja 
                    </label>
                    <input onChange={(e) => setName(e.target.value)} value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"/>
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
                        Descrição da loja
                    </label>
                    <textarea onChange={(e) => (setDesc(e.target.value))} value={store_desc}  className=" min-h-60 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="desc">
    
                    </textarea>
                    </div>
                    <div className="flex items-center justify-between">
                    <button onClick={(e) => Submit(e)} className="bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Confirmar Alterações
                    </button>
                    </div>
                </form>
            </div>
    );
}

export default ChangeStoreProfileInfo;
