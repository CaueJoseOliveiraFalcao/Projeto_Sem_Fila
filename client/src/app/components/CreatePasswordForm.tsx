import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreatePasswordForm = () => {
    const [ClientName , setClient] = useState('');
    const [ClientPassword , setClientPasswors] = useState('');
    const Submit = () =>{
        console.log(ClientName , ClientPassword);
    }
    return (
        <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Nome do Cliente(opcional)
            </label>
            <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" 
              type="text" 
              maxLength={30}
              placeholder="Username"
              onChange={(e) => setClient(e.target.value)}/>
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Nova Senha
            </label>
            <input 
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="text" 
            onChange={(e) => setClientPasswors(e.target.value)}/>
            </div>
            <div className="flex items-center justify-between">
            <button onClick={Submit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Enviar
            </button>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
        </p>
</div>
    );
}

export default CreatePasswordForm;
