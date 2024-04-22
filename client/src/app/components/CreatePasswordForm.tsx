import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreatePasswordForm = () => {
    const [Error , SetError] = useState(false);
    const [ErrorMsg , SetErrorMsg] = useState("");

    const user = localStorage.getItem('wait-App:user');
    const token = localStorage.getItem('wait-App:token');
    const [clientname , setClient] = useState('');
    const [clientpassword , setClientPasswors] = useState('');
    const convertedUser = JSON.parse(user);
    const storeid = convertedUser.id

    const Submit = () =>{
        axios.post('http://localhost:8082/api/store/create' , {clientname , clientpassword , storeid , token} , {
            headers : {
                authorization : `${token}`
            }
        })
        .then((res) => {
                window.location.reload();
        })
        .catch((err) => {
            console.log(err.response.data.msg);
            SetErrorMsg(err.response.data.msg);
            SetError(true);
        })
    }
    return (
        <div className="w-full max-w-96 mt-8">
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
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="text" 
            required
            onChange={(e) => setClientPasswors(e.target.value)}/>
            </div>
            {Error === true && (
                <p className='bg-red-500 p-5 mb-5 mt-0 text-sm rounded-md text-white'>
                    {ErrorMsg}
                </p>
            )}

            
            <div className="flex items-center justify-between">
            <button onClick={Submit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Enviar
            </button>
            </div>
        </form>
</div>
    );
}

export default CreatePasswordForm;
