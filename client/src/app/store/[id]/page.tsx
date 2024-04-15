'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from './store.module.css'


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
        } , "15000");

    },[])
    if (storeInfo && users) {
        return(
        <main className={style.bgM}>
            <h1 className="text-center pt-6 text-white text-2xl">{storeInfo.name}</h1>
            <h2 className="text-center pt-6 text-white text-2xl">{storeInfo.cnpj}</h2>
            {users.length > 0 && (
                <div>
                    <h2 className="text-center pt-6 text-white text-2xl mb-3">Senhas Atuais : </h2>
                    <div className="flex justify-center items-center">
                        <ul className=" bg-gray-300 w-96 rounded-xl text-black">
                            {users.map((user, index) => (
                            <div key={index}>
                                <li className=" text-center my-4 " key={index}>
                                    {user.clientname ? user.clientname : 'Senha sem Nome'} - {user.clientpassword} - {user.status === 'completed' ? 'Pedido Pronto' : 'Pedido em Preparo'}
                                </li>
                            </div>

                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </main>
    );}
}