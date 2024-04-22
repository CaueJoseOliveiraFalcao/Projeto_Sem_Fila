'use client'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import LogoutStore from './LogoutStore';
export default function Headerp() {
    const [isOpen, setIsOpen] = useState(false);
    const user = localStorage.getItem('wait-App:user');
    const convertedUser = user ? JSON.parse(user) : '';
    console.log(convertedUser.id)
    return(
        <nav  className="bg-red-600 p-5 mt-0 w-full">
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="flex w-full md:w-1/2 justify-between items-center">
                    <div className='flex items-center'>
                        <img width={75} height={75} src="../mascote_icone.png" alt="" srcset="" />
                        <a href='/'className="text-white text-xl font-bold">Queue Fila UE?</a>
                    </div>

                <button
                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FaBars/>
                </button>
                </div>

                <div
                className={`md:flex md:w-1/2 md:justify-end ${isOpen ? 'flex' : 'hidden'
                    }`}
                >
                    <LogoutStore/>
                    <a className="text-white text-sm mr-5 cursor-pointer" href='/StoreDashboard'>Painel de Controle</a>
                    <a className="text-white text-sm mr-5 cursor-pointer" href={'/store/' + convertedUser.id}>Pagina da Loja</a>
                    <a className="text-white text-sm cursor-pointer" href='/StoreDashboard/StoreProfile'>Perfil</a>
                </div>
            </div>
        </nav>
    )
}