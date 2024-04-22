'use client'
import axios from "axios";
import { error } from "console";
import Headerb from "./components/Headerb";
import { useEffect, useState } from "react";
import styles from './styles.module.css'
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
  }, []);

  console.log(stores);
  return (
    <main className={styles.mainD}>
      <Headerb/>
      <h1 className="text-center text-4xl p-5">Lojas Disponiveis</h1>
      <div className="cards flex flex-wrap w-full justify-center mt-3">
        <div className="sm:w-3/4 w-full flex flex-wrap ">
        {stores.map(store => (
          <div key={store.id} className=" bg-red-600 flex flex-col items-center justify-between sm:w-80 w-full m-0 sm:m-1 border border-gray-200 rounded-lg shadow ">
                    <img className="rounded-t-lg w-full h-60 object-cover"   src={store.imgProfile ? store.imgProfile : 'https://stcotvfoco.com.br/2023/10/McDonalds-1.png'} alt="" />
                    <a href="#">
                        <h5 className="mb-2 p-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{store.name}</h5>
                    </a>
                    <p className="mb-3 font-normal p-3 mb-3 text-white">{store.store_desc ? store.store_desc.substring(0, 100) + '...' : ''}</p>
                    <a href={`/store/${store.id}`} className=" p-3 mb-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg focus:ring-4 focus:outline-none ">
                        Pagina da Loja
                    </a>  
        </div>
      ))}
        </div>



      </div>


    </main>
  );
}
