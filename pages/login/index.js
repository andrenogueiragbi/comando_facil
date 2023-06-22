import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { BaseUrl } from "../../util/link";
import ModalErro from '../../components/ModalErro'
import ModalAlert from '../../components/ModalAlert'
import { setCookie,parseCookies } from '../../util/cookies';
import { isTokenExpired } from '../../util/auth'
import {useState} from 'react'

export async function getServerSideProps(context) {

    const cookies = parseCookies(context.req);

    const user = isTokenExpired(cookies.token)


       if (cookies.token && !user.expired) {

        return {
            redirect: {
                permanent: false,
                destination: "/register",
            },
        }; 

    }
    
    



    return {
        props: {
            user: 0
        }
    }






}






export default function Login() {
    const router = useRouter();
    const [failLogin, setFailLogin] = useState(false)
    const [failLoginNull, setFailLoginNull] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const onSubmit = async () => {


        if(!email || !password) {
            setFailLoginNull(true)
            return


        }





        const  {data}  = await BaseUrl.post("users/login", { email, password });




        if (!data?.erro && data.token) {
            setCookie("token", data.token);
            router.push('/register')

        } else {
            setFailLogin(true)



        }










    }



    return (

        <div className={styles.container}>
            {
                failLogin ?
                    <ModalErro setFailLogin={setFailLogin} />

                    :
                    false

            }
            {
                failLoginNull ?
                    <ModalAlert setFailLoginNull={setFailLoginNull} failLoginNull={failLoginNull} />

                    :
                    false

            }

            <form  className={styles.area_form} >

                <div className={styles.area_text_login} >
                    <Image
                        src='/images/login.png'
                        width={40}
                        height={40}
                        alt='code'

                    />
                    <h1 className={styles.text_login}>Login</h1>

                </div>

                <input type="email" id="username" name="username" onChange={e=>setEmail(e.target.value)} placeholder='email...' />
                <input type="password" id="password" name="password" onChange={e=>setPassword(e.target.value)} placeholder='senha...' />

                <button onClick={onSubmit} type='button'>Entrar</button>
            </form>

        </div>
    )
}