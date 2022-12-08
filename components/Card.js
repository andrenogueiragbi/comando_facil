
import Image from "next/image"
import Link from "next/link"
import styles  from '../styles/Card.module.css'

export default function Card({ item }) {
    return (
        <div className={styles.card}>
            <Image
                src={item.link ? item.link : 'https://www.freepnglogos.com/uploads/warning-sign-png/image-warning-sign-elena-avalor-21.png'}
                width="120"
                height="120"
                alt={'linux'}
            />
            <p className={styles.id} >#{item.id}</p>
            <h3 className={styles.title }>{item.name}</h3>
            <Link legacyBehavior href={`/commands/${item.id}`}>
                <a className={styles.btn} >Comandos</a>
            </Link>

        </div>
    )

}