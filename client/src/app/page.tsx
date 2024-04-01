'use client'
import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";

export default function Home() {
  const [stores ,setStores] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8082/api/store/showStores')
    .then((res) => {
      setStores(res.data.stores);
    })
    .catch((error) => {
      console.log(error)
    })
  })
  return (
    <main className="h-full">
      
      <h1 className="text-center text-4xl p-5">Painel de lojas</h1>
      <div className="w-full justify-center flex items-center">
        <a  href="/auth/login">Painel de controle da Loja</a>
      </div>

      <div className="cards flex flex-wrap justify-center mt-3">
        <div className="w-3/4 flex flex-wrap ">
        {stores.map(store => (
          <div className=" w-1/6 m-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src="https://stcotvfoco.com.br/2023/10/McDonalds-1.png" alt="" />
                </a>
          <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{store.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{store.desc}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                    </a>
                </div>
            </div>
      ))}
        </div>



      </div>


    </main>
  );
}
