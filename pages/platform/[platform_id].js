import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Command.module.css'


export async function getServerSideProps(context) {
    const id = context.params.platform_id

    console.log(id)
    const link = 'http://localhost:5000'


    const result = await fetch(`${link}/platform/${id}`)
    const data = await result.json()

    return {
        props: {
            types: data.types
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


export default function pPokemon({ types }) {

    console.log(">>", types)



    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{types.name}</h1>

            <Image
                src={types.avatar ? types.avatar : 'https://www.freepnglogos.com/uploads/warning-sign-png/image-warning-sign-elena-avalor-21.png'}
                width="200"
                height="200"
                alt={types.name}
            />


            <div>
                <h3>Descrição: </h3>
                <div>

                    <p>{types.description}</p>
                </div>

                <div className={styles.types_container} >

          
                    <span className={styles.type}>      
                        <Link legacyBehavior href={`/commands/5`}>
                            <a className={styles.btn} >Comandos</a>
                        </Link>
                    </span>
         
                    <span className={styles.type}>      
                        <Link legacyBehavior href={`/platform/5`}>
                            <a className={styles.btn} >Comandos</a>
                        </Link>
                    </span>
         
                    <span className={styles.type}>      
                        <Link legacyBehavior href={`/platform/5`}>
                            <a className={styles.btn} >Comandos</a>
                        </Link>
                    </span>
         
                    <span className={styles.type}>      
                        <Link legacyBehavior href={`/platform/5`}>
                            <a className={styles.btn} >Comandos</a>
                        </Link>
                    </span>
         

                </div>

            </div>



        </div>
    )

}

