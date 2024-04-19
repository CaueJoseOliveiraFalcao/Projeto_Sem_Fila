'use client'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
export default function Headerb() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <nav  className="bg-red-600 p-5 mt-0 w-full">
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="flex w-full md:w-1/2 justify-between items-center">
                    <a className="text-white text-xl font-bold">Queue Fila UE?</a>
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
                    <a className="text-white mr-5 cursor-pointer" href='/'>Lojas</a>
                    <a className="text-white cursor-pointer" href='/StoreDashboard'>Painel de Controle</a>
                </div>
            </div>
        </nav>
    )
}