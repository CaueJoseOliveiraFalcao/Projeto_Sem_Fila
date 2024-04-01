'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from './store.module.css'


export default function PublicStorePage({ params }: { params: { id: string } }) {
    const [storeInfo, setStoreInfo] = useState(); 
    const [users, setUsers] = useState(); 
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
    console.log(storeInfo)
    if (storeInfo && users) {
        return(
        <main className={style.bgM}>
            <h1 className="text-center pt-6 text-white text-2xl">{storeInfo.name}</h1>
            <h2 className="text-center pt-6 text-white text-2xl">{storeInfo.cnpj}</h2>

        </main>
    );}
}