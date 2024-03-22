import axios from "axios"
import { useRouter } from "next/navigation";

export default function LogoutStore() {
    const router = useRouter();
    const logout = () =>{
        axios.get('http://localhost:8082/api/auth/logout')
        .then((res) => {
            if (res.status === 200){
                localStorage.removeItem('wait-App:token');
                localStorage.removeItem('wait-App:user');
                router.push('/');
            }
        }).catch((error)=> {
            console.log(error);
        })   
    }
    return (
            <div>
                <button onClick={logout}>Logout</button>
            </div>
    )
}