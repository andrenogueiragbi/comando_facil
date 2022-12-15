import styles from '../../styles/Login.module.css'
import Image from 'next/image'

export async function getServerSideProps(props) {
    const link = 'https://commands-api.onrender.com'

    
    const result = await fetch(`${link}/platforms`)
    const data = await result.json()

    return {
        props: {
            platforms: data.data
        }
    }



}


export default function Register() {
    return (
        <div className={styles.container}>

            <div action="/cadastro" className={styles.area_form} >

                <div  className={styles.area_text_login} >
                    <Image
                        src='/images/plus.png'
                        width={40}
                        height={40}
                        alt='code'

                    />
                    <h1 className={styles.text_login}>Cadastrar</h1>

                </div>

      

                <button>Platforma</button>
                <button>Titulo</button>
                <button>Comandos</button>
                <button>Usuario</button>
            </div>

        </div>
    )
}