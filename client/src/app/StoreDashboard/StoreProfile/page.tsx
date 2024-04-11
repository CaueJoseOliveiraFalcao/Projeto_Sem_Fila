'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import ChangeStoreProfileInfo from "@/app/components/ChangeStoreProfileInfo";
export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem('wait-App:token');
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


  const user = localStorage.getItem('wait-App:user');
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [UrlImage , setUrlImage] = useState('');
  const convertedUser = JSON.parse(user);
  const userId = convertedUser.id ? convertedUser.id : '';

  if(!convertedUser || !token){
    router.push('/auth/login/');
  }


    useEffect(() => {
      axios.post("http://localhost:8082/api/img/seachProfile" , {userId} , {
        headers : {
          authorization: `${token}`
        }
      })
      .then((res) => {
        setUrlImage(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);

  const setAndVerifyImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedImg = e.target.files && e.target.files[0];
    console.log(selectedImg);
    if (selectedImg) {
      const allowedTypes = ['image/jpg' , 'image/png' , 'image/jpeg'];
      const maxSize = 5 * 1024 * 1024; //5mb
      if (allowedTypes.includes(selectedImg.type)) {
        if (selectedImg.size <= maxSize) {
            setImage(selectedImg);
            setError(null);
        } else {
            setImage(null);
            setError('A imagem selecionada é muito grande. Por favor, selecione uma imagem menor sque 5 MB.');
        }
    } else {
        setImage(null);
        setError('Por favor, selecione uma imagem no formato JPG ou PNG.');
    }
    }
  }

  const sendImg =  async(e:any) =>{
    e.preventDefault(e);
    if (image != null){
      const formData = new FormData()
      formData.append('file' , image);
      formData.append('userId', convertedUser.id);
      try {
        const response = await axios.post('http://localhost:8082/api/img/uploadProfile' , formData , {
          headers : {
            'Content-Type' : 'multipart/form-data',
            authorization: `${token}`
          }
        }).then((res) => {
            window.location.reload();
        })
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <main className="flex min-h-screen flex-col  items-center p-24">
        <p>Store Profile</p>
        <ChangeStoreProfileInfo/>
        <div>
              <div className="flex items-center justify-between flex-col">
                <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                  Imagem de Perfil da Loja
                </label>
                <img className="profilePicture" width={'400px'} height={'400px'} src={UrlImage ? UrlImage : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="" />
                <p>{!UrlImage ? 'ADICIONE UMA FOTO DE PERFIL' : ''}</p>
              </div>
              <h1 className="mt-7 text-center">ALterar foto de Perfil da loja</h1>
              <div className="mt-2 d-flex flex-coll">
                <form id="imageUploadForm" className=" flex flex-col" method="POST" encType="multipart/form-data">
                  <input type="file" className="bg-slate-200  rounded-sm  p-5 text-black" onChange={(e) => (setAndVerifyImg(e))} id="imageFileInput" name="file" accept="image/*" required/>
                  <button onClick={(e) => (sendImg(e))} className="bg-blue-600 mt-5 p-2 rounded-xl text-white">Enviar</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
              </div>
            </div>
    </main>
  );
}
