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

        const { data } = await BaseUrl.get(`/platforms`, { "Accept-Encoding": "gzip" })

        console.log(`${user.data.name} LOGOU NO APP`)

        user.data['token'] = cookies.token;



        return {
            props: {
                user: user.data,
                platforms: data.data
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


export default function RegisterPlatform({ user, platforms }) {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [icon, setIcon] = useState(null)
    const [loading, setLoading] = useState(false)




    const onSubmit = async (event) => {
        setLoading(true)


        event.preventDefault();

        const platform = document.querySelector("#idPlatform").value;
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        /*         const avatar = document.querySelector("#avatar").value;
         */


        if (!platform || !title || !description) {
            setFailRegisterNull(true)
            return


        }


        try {
            const { data } = await BaseUrl.post(
                "titles",
                { id_platforms: platform, title, undefined, description },
                { headers: { Authorization: `Bearer ${user.token}` } }

            );


            if (!data.erro) {

                document.querySelector("#title").value = ""
                document.querySelector("#description").value = ""
                setIcon('success')
                setMessage(data.message)
                setOpenModal(true)
                setLoading(false)




                return

            } else {
                setIcon('info')
                setMessage(data.message)
                setOpenModal(true)
                setLoading(false)



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
                    {/*                     <Image
                        src='/images/icon-platform2.png'
                        width={40}
                        height={40}
                        alt='code'

                    /> */}
                    <h1 className={styles.text_login}>Cadastro Tipos</h1>

                </div>
                <label >Plataforma</label>
                <select id="idPlatform" name="idPlatform">

                    {
                        platforms.length > 0 && platforms &&
                        platforms.map((item) => (
                            <option id="platform" name="platform" key={item.id} value={item.id}>{item.name}</option>

                        ))
                    }

                </select>
                <label>Titulo</label>
                <input id="title" name="title" placeholder='nome titulo...' required />
                <label>Descrição</label>
                <input id="description" name="description" placeholder='descrição...' required />

                {/*     

 <label>Link do avatar</label>
<input id="avatar" name="avatar" placeholder='link do avatar...' />
 */}


                <button type='submit'>
                    {loading ? <span className={styles.spinner}></span> :'Salvar'}
                </button>




            </form>


        </div>
    )
}