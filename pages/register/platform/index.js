import styles from '../../../styles/Register.module.css'
import Image from 'next/image'
import { setCookie, parseCookies } from '../../../util/cookies';
import { isTokenExpired } from '../../../util/auth'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { BaseUrl } from '../../../util/link';
import Modal from '../../../components/Modal';




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


export default function RegisterPlatform({ user }) {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [icon, setIcon] = useState(null)



    const onSubmit = async (event) => {

        event.preventDefault();

        const platform = document.querySelector("#platform").value;
        const description = document.querySelector("#description").value;
        const avatar = document.querySelector("#avatar").value;


        if (!platform) {
            setFailRegisterNull(true)
            return


        }


        try {
            const { data } = await BaseUrl.post("platforms", { name: platform, avatar, description });

            console.log(data)

            if (!data.erro) {
                setIcon('success')
                setMessage(data.message)
                setOpenModal(true)



                return

            }else{
                setIcon('info')
                setMessage(data.message)
                setOpenModal(true)


            }



        }



        catch (e) {


            setMessage(e?.message)
            setOpenModal(true)



        }









    }









    return (
        <div className={styles.container}>
            {
                openModal ?
                    <Modal message={message} icon={icon} setOpenModal={setOpenModal} />

                    :
                    false

            }


            <form method="post" onSubmit={onSubmit} className={styles.area_form} >

                <div className={styles.area_text_login} >
                    <Image
                        src='/images/icon-platform2.png'
                        width={40}
                        height={40}
                        alt='code'

                    />
                    <h1 className={styles.text_login}>Cadastro Plataforma</h1>

                </div>

                <input id="platform" name="platform" placeholder='nome plataforma...' required />
                <input id="description" name="description" placeholder='descrição...' required />
                <input id="avatar" name="avatar" placeholder='link do avatar...' />


                <button type='submit'>Salvar</button>
            </form>


        </div>
    )
}