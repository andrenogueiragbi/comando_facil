import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Platform.module.css'
import { useRouter } from 'next/router'


export async function getServerSideProps(context) {
    const id = context.params.platform_id

    const link = 'http://localhost:5000'


    const resultPlatform = await fetch(`${link}/platform/${id}`)
    const dataPlatform = await resultPlatform.json()

    const resultTitle = await fetch(`${link}/title/platform/${id}`)
    const dataTitle = await resultTitle.json()


    return {
        props: {
            platform: dataPlatform.data,
            title: dataTitle.data
        }
    }



}


/* export const getStaticPaths = async () => {

    const maxPokemos = 251
    const api = 'https://pokeapi.co/api/v2/pokemon'
    const res = await fetch(`${api}/?limit=${maxPokemos}`)
    const data = await res.json()

    const paths = data.results.map((pokemon, index) => {
        return {
            params: { pokemonId: (index + 1).toString() },
        }
    })

    return {
        paths,
        fallback: false,
    }


}
 */

/* export const getStaticProps = async (context) => {
    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()


    return {
        props: { pokemon: data }
    }


}
 */


export default function Comandos({ platform, title }) {

    const router = useRouter()


    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{platform.name}</h1>

            <Image
                src={platform.avatar ? platform.avatar : 'https://www.freepnglogos.com/uploads/warning-sign-png/image-warning-sign-elena-avalor-21.png'}
                width="200"
                height="200"
                alt={platform.name}
            />


            <div>
                <h3>Descrição: </h3>
                <div>

                    <p>{platform.description}</p>
                </div>

                <div className={styles.types_container} >

                    {title.length > 0 ?
                        title.map((item) => (
                            <span className={styles.type}>
                                <Link legacyBehavior href={`/command/${item.id}`}>
                                    <a className={styles.btn} >{item.title}</a>
                                </Link>
                            </span>

                        ))


                        :
                        <>
                            <h1 className={styles.info_null} >😌  Sem Comandos por aqui.</h1>
                          
                        </>


                    }
                    


                </div>
                <button onClick={() => router.back()} className={styles.btn_go_back}>voltar!</button>

            </div>



        </div>
    )

}

