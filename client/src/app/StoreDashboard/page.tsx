'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import CreatePasswordForm from "../components/CreatePasswordForm";
import { useState } from "react";
import LogoutStore from "../components/LogoutStore";
import { TableOfUsers } from "../components/TableOfUsers";
import Headerp from "../components/Headerp";
export default function Home() {
  const router = useRouter();
  const user = localStorage.getItem('wait-App:user');
  const token = localStorage.getItem('wait-App:token');

  const convertedUser = JSON.parse(user);

  if(convertedUser === null || token === null){
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
  const storeName = convertedUser ? convertedUser.name : '';

  const storeid = convertedUser ? convertedUser.id : '';
  const storecnpj = convertedUser ? convertedUser.cnpj : '';
  const storeImg = convertedUser ? convertedUser.imgProfile : '';
  const storeDesc = convertedUser ? convertedUser.store_desc : '';
  const [storeUsers, setStoreUsers] = useState([]);


   
  return (
  <div>
    <Headerp/>
        <main className="flex min-h-screen flex-col items-center">
        <h1 className="mt-8 sm:text-2xl bg-red-700 p-3 text-white  rounded-xl">Painel de Controle {storeName ? storeName : ''}</h1>
        {storeName &&
            <>
            <CreatePasswordForm/>
            <LogoutStore/>
            <TableOfUsers/>
          </>
        }

    </main>
  </div>

  );
}
