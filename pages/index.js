import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'

export async function getServerSideProps(props) {
    const link = 'http://localhost:5000'

    
    const result = await fetch(`${link}/platforms`)
    const data = await result.json()

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
                <h1 className={styles.title} >Poke<span>Next</span></h1>
                <Image
                    src='/images/pokeball.png'
                    width={50}
                    height={50}
                    alt='Pokenet'

                />
            </div>



            <div className={styles.pokemon_container}>

                {
                    platforms.map((item)=>(
                        <Card key={item.id} item={item}/>
                    ))
                    
                }
             

            </div>
        </>


    )
}