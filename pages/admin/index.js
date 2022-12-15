import styles from '../../styles/Admin.module.css'
import Image from 'next/image'

export default function About() {
    return (
        <div className={styles.container}>

            <div className={styles.area_form} >

                <div  className={styles.area_text_login} >
                    <Image
                        src='/images/login.png'
                        width={40}
                        height={40}
                        alt='code'

                    />
                    <h1 className={styles.text_login}>Login</h1>

                </div>

                <input placeholder='email...' />
                <input placeholder='senha...' />

                <button>Entrar</button>
            </div>

        </div>
    )
}