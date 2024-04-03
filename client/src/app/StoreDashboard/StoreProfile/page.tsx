'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Store Profile</p>
    </main>
  );
}
