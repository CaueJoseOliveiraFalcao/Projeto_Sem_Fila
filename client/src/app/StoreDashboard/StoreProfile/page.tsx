'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const user = localStorage.getItem('wait-App:user');
  const token = localStorage.getItem('wait-App:token');
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
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
      console.log(convertedUser)
      try {
        const response = await axios.post('http://localhost:8082/api/auth/upload' , formData , {
          headers : {
            'Content-Type' : 'multipart/form-data',
            authorization: `${token}`
          }
        });
        console.log(response.data)
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <main className="flex min-h-screen flex-col  items-center p-24">
        <p>Store Profile</p>
        <div>
              <div className="flex items-center justify-between">
                <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                  Imagem de Perfil da Loja
                </label>
                <img src="" alt="" />
              </div>
              <h1 className="mt-7 text-center">ALterar foto de Perfil da loja</h1>
              <div className="mt-2">
                <form id="imageUploadForm" method="POST" encType="multipart/form-data">
                  <input type="file" onChange={(e) => (setAndVerifyImg(e))} id="imageFileInput" name="file" accept="image/*" required/>
                  <button onClick={(e) => (sendImg(e))}>Enviar</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
              </div>
            </div>
    </main>
  );
}
