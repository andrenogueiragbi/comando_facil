import styles from '../../styles/Login.module.css'
import Image from 'next/image'
import { setCookie, parseCookies } from '../../util/cookies';
import { isTokenExpired } from '../../util/auth'

export async function getServerSideProps(context) {

    try {
        const cookies = parseCookies(context.req);

        const user = isTokenExpired(cookies.token)


        if (!cookies.token || user.expired) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
            };

        }

        console.log(`${user.data.name} LOGOU NO APP`)

        user.data['token'] = cookies.token;

        return {
            props: {
                user: user.data
            }
        }



    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/500",
            },
        };

    }







}


export default function Register({ user }) {
    return (
        <div className={styles.container}>
            <h1>{user.name}</h1>

            <div action="/cadastro" className={styles.area_form} >

                <div className={styles.area_text_login} >
                    <Image
                        src='/images/plus.png'
                        width={40}
                        height={40}
                        alt='code'

                    />
                    <h1 className={styles.text_login}>Cadastrar</h1>

                </div>



                <a href="/register/platform"><button>Platforma</button></a>
                <a href="/register/title"><button>Titulo</button></a>
                <a href="/register/commands"><button>Comandos</button></a>
                <a href="/register/user"><button>Usuario</button></a>
            </div>

        </div>
    )
}