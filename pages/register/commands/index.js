import styles from '../../../styles/Register.module.css'
import Image from 'next/image'
import { setCookie, parseCookies } from '../../../util/cookies';
import { isTokenExpired } from '../../../util/auth'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { BaseUrl } from '../../../util/link';
import Modal from '../../../components/Modal';
import Link from 'next/link';




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
        /*         const { data } = await BaseUrl.get(`/title`, { "Accept-Encoding": "gzip" })
         */
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
    const [titles, setTitles] = useState([])
    const [platformSelect, setPlatformSelect] = useState(1)



    const onSubmit = async (event) => {

        event.preventDefault();

        const platform = document.querySelector("#idPlatform").value;
        const description = document.querySelector("#description").value;
        const commands = document.querySelector("#commands").value;
        const tags = document.querySelector("#tags").value;
        const title_id = document.querySelector("#title_id").value;
        const { name: creator } = user

        console.log(platform, "|", description, commands, tags, creator, title_id)



        if (!description || !commands || !description || !tags || !creator || !title_id) {
            setFailRegisterNull(true)
            return

        }


        try {
            const { data } = await BaseUrl.post(
                "commands",
                { description, commands, tags, creator, title_id },
                { headers: { Authorization: `Bearer ${user.token}` } }

            );


            if (!data.erro) {
                document.querySelector("#description").value = ""
                document.querySelector("#commands").value = ""
                document.querySelector("#tags").value = ""
                setIcon('success')
                setMessage(data.message)
                setOpenModal(true)

                return

            } else {
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

    useEffect(() => {

        const title = async () => {
            await BaseUrl.get(`/title/platform/${platformSelect}`, { "Accept-Encoding": "gzip" })
                .then(({ data }) => {
                    setTitles(data.data);
                    if (data.data.length == 0) {
                        setMessage('Não existe titulo(categoria) para a plataforma selecionada.')
                        setOpenModal(true)

                    }
                }).catch((err) => {
                    alert(err);
                }).finally(() => { });
        }

        title()




    }, [platformSelect])









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
                    <h1 className={styles.text_login}>Cadastro Comandos</h1>

                </div>
                <label >Plataforma</label>
                <select id="idPlatform" name="idPlatform" onChange={t => setPlatformSelect(t.target.value)}>

                    {
                        platforms.length > 0 && platforms &&
                        platforms.map((item) => (
                            <option id="platform" name="platform" key={item.id} value={item.id}>{item.name}</option>

                        ))
                    }

                </select>
                <label>Titulo</label>
                <select id="idPlatform" name="idPlatform">

                    {
                        titles.length > 0 && titles &&
                        titles.map((item) => (
                            <option id="title_id" name="title_id" key={item.id} value={item.id}>{item.title}</option>

                        ))
                    }

                </select>
                {titles.length == 0 &&
                    <Link legacyBehavior href={`/register/title/`}>
                        <a className={styles.btn} >Cadastro titulo agora!</a>
                    </Link>
                }
                <label>Comando</label>
                <textarea id="commands" className={styles.area_form_input} name="commands" placeholder='descrição...' required ></textarea>
                <label>O que faz?</label>
                <textarea id="description" className={styles.area_form_title} name="description" placeholder='descrição...' required ></textarea>
                <label>tags</label>
                <input id="tags" name="tags" placeholder='digite uma tag...' required ></input>

                {/*       
                <label>Link do avatar</label>
                <input id="avatar" name="avatar" placeholder='link do avatar...' />
 */}

                <button type='submit'>Salvar</button>
            </form>


        </div>
    )
}