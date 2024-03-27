import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash , FaExchangeAlt  } from "react-icons/fa";

export const TableOfUsers = () => {
    const user = localStorage.getItem('wait-App:user');
    const token = localStorage.getItem('wait-App:token');
    const convertedUser = JSON.parse(user);
    const router = useRouter();
    const [storeUsers , setStoreUsers] = useState([]);

    const storeid = convertedUser.id;
    useEffect(() =>{
        axios.post('http://localhost:8082/api/store/show' , {storeid} , {
            headers : {
                authorization : `${token}`
            }
        })
        .then((res) => {
          setStoreUsers(res.data.users);
        })
        .catch((err) => {
            router.push
        })
    },[])

    const deleteUser = (id : any) => {
        axios.post('http://localhost:8082/api/store/delete' , {id} , {
            headers : {
                authorization : `${token}`
            }
        })
        .then((res) => {
            window.location.reload();
        })
        .catch((err : any) => {
            console.log(err)
        })
    }
    const ChangeStatus = (id : any) => {
        axios.post('http://localhost:8082/api/store/change' , {id} , {
            headers : {
                authorization : `${token}`
            }
        })
        .then((res) => {
            window.location.reload();
        })
        .catch((err : any) => {
            console.log(err)
        })
    }
    console.log(storeUsers);
    return(
        <div className="w-full">
            <h1 className="text-center my-8 text-4xl">Controle De Senhas</h1>
            <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left px-4 py-2">Id</th>
                <th className="text-left px-4 py-2">Nome</th>
                <th className="text-left px-4 py-2">Senha</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-center px-4 py-2">Deletar</th>
                <th className="text-center px-4 py-2">Mudar Status</th>
                </tr>
            </thead>
            <tbody>
                {storeUsers && storeUsers.map((user) => (
                <tr key={user.id} className="p-4">
                    <td className="text-left px-4 py-2">{user.id}</td>
                    <td className="text-left px-4 py-2">{user.clientname}</td>
                    <td className="text-left px-4 py-2">{user.clientpassword}</td>
                    <td className="text-left px-4 py-2">{user.status}</td>
                    <td className="text-left px-4 py-2 ">
                        <span className="flex justify-center items-center cursor-pointer">
                            <button onClick={() => (deleteUser(user.id))} >
                                <FaTrash/>
                            </button>
                        </span>
                    </td>
                    <td className="text-center px-4 py-2 ">
                        <span  className="flex justify-center items-center cursor-pointer">
                        <button onClick={() => (ChangeStatus(user.id))}>
                            <FaExchangeAlt/>
                        </button>
                        </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

    )
}