'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from './store.module.css'
import Headerb from "@/app/components/Headerb";

export default function PublicStorePage({ params }: { params: { id: string } }) {
    const [storeInfo, setStoreInfo] = useState(); 
    const [users, setUsers] = useState<any>([]); 

    
    useEffect(() => {
        axios.post('http://localhost:8082/api/store/showStoresUsers' , {id : params.id})
        .then((res) =>{
            setStoreInfo(res.data.data.storeif);
            setUsers(res.data.data.users);
        })
        .catch((error : string) => {
            console.log(error)
        })
    }, [params.id])

    useEffect(() => {
        setTimeout(() => {
            window.location.reload();
        } , "10000");

    },[])
    console.log(storeInfo , users);
    if (storeInfo && users) {
        return(
        <main className={style.bgM}>
            <Headerb/>
            <div className="flex justify-center items-center flex-col flex-wrap">
                <div className="flex flex-col text-white mt-10  sm:w-3/6 w-full sm:rounded-xl mb-10">

                    <div className="p-5 bg-yellow-500 sm:rounded-lg">
                    <h2 className="text-4xl pt-1 pb-3">Em Preparo</h2>
                    {users.map((user, index) => (
                        <div key={index}>
                            <p className="text-1xl">{user.status === "peding" ? user.clientpassword + '-' + (user.clientname ? user.clientname : 'sem nome') : ''}</p>
                        </div>
                    ))}

                    </div>
                    <div className="p-5 bg-green-500 sm:rounded-lg">
                        <h2 className="text-4xl pt-1 pb-3">Prontos</h2>
                        {users.map((user, index) => (
                        <div key={index}>
                            <p>{user.status === "completed" ? user.clientpassword + '-' + (user.clientname ? user.clientname : 'sem nome'): ''}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mb-10 flex-wrap">
                <div className="flex flex-col bg-gray-950 justify-center items-center sm:w-3/6 rounded-xl">
                <h1 className="text-center pt-6 text-white text-2xl">{storeInfo.name}</h1>
                    <div className="w-3/4 py-3 flex justify-center items-center">
                        <img  className="object-cover w-10/12 rounded-lg"  src={storeInfo.imgProfile ? storeInfo.imgProfile : 'https://stcotvfoco.com.br/2023/10/McDonalds-1.png'}alt="" />
                    </div>
                    <div className=" rounded-e-lg sm:w-full p-5">
                        <p className=" p-5 rounded-lg text-white text-sm  bg-red-800">{storeInfo.storeDesc}</p>
                    </div>
                </div>
            </div>

        </main>
    );}
}