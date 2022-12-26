import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import { BaseUrl } from "../util/link";

export async function getServerSideProps(props) {
  
    
    const {data} = await BaseUrl.get(`/platforms`, { "Accept-Encoding": "gzip,deflate,compress" } )

    return {
        props: {
            platforms: data.data
        }
    }



}


export default function Home({platforms}) {
    return (

        <>
            <div className={styles.title_conteiner}>
                <h1 className={styles.title} >Comando<span>Next</span></h1>
                <Image
                    src='/images/code.png'
                    width={50}
                    height={50}
                    alt='Pokenet'

                />
            </div>



            <div className={styles.pokemon_container}>

                {   platforms &&
                    platforms.map((item)=>(
                        <Card key={item.id} item={item}/>
                    ))
                    
                }
             

            </div>
        </>


    )
}