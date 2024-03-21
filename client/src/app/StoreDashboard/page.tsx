'use client'
import axios from "axios";
import { error } from "console";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CreatePasswordForm from "../components/CreatePasswordForm";
import { use, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const user = localStorage.getItem('wait-App:user');
  const token = localStorage.getItem('wait-App:token');
  const convertedUser = JSON.parse(user);

  if(!convertedUser || !token){
    router.push('/auth/login/');
  }
  axios.get('http://localhost:8082/api/auth/refresh', {
    headers: {
      authorization: `${token}`
    }
  })
  .then(response => {
    // Verificar o status da resposta
    if (response.status === 200) {
      const res = response.data.tokenR;
      if (res == 'false') {
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  })
  .catch(error => {
    router.push('/auth/login');
  });


  const storeName = convertedUser.name;
  const storeid = convertedUser.id;
  const storecnpj = convertedUser.cnpj;
  const storeImg = convertedUser.imgProfile;
  const storeDesc = convertedUser.store_desc;
  const [storeUsers, setStoreUsers] = useState([]); 
  useEffect(() =>{
    axios.post('http://localhost:8082/api/store/show' , {token , storeid})
    .then((res) => {
      setStoreUsers(res.data.users);
    })
    .catch((err) => {
      console.log(err);
    })
},[])

   
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1>Painel de Controle {storeName}</h1>
        <CreatePasswordForm/>
        {storeUsers && storeUsers.map((user) => (
          <div key={user.id}>
            <p>Nome: {user.clientname}</p>
            <p>Status: {user.status}</p>
          </div>
        ))}
    </main>
  );
}
