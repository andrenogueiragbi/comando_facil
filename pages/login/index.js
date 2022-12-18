import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { BaseUrl } from "../../util/link";
import ModalErro from '../../components/ModalErro'
import { setCookie } from '../../util/cookies';

export default function About() {
    const router = useRouter();
    const [failLogin, setFailLogin] = useState(false)



    const onSubmit = async (event) => {

        event.preventDefault();

        const email = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

       

    

        const { data } = await BaseUrl.post("users/login", {email, password});

       

        if(!data?.erro && data.token){
            setCookie("token", data.token);
            router.push('/register')

        }else{
            setFailLogin(true)

 

        }

        console.log(data.erro)
        


        



        

    }



    return (

        <div className={styles.container}>
            {
                failLogin ?
                    <ModalErro setFailLogin={setFailLogin} />

                :
                false

            }

            <form method="post" onSubmit={onSubmit} className={styles.area_form} >

                <div className={styles.area_text_login} >
                    <Image
                        src='/images/login.png'
                        width={40}
                        height={40}
                        alt='code'

                    />
                    <h1 className={styles.text_login}>Login</h1>

                </div>

                <input type="email" id="username" name="username" placeholder='email...'  />
                <input type="password" id="password" name="password" placeholder='senha...' />

                <button type='submit'>Entrar</button>
            </form>

        </div>
    )
}