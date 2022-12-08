
import Image from "next/image"


import styles from '../../styles/Command.module.css'

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


export default function pPokemon({ pokemon }) {

    console.log(">>",pokemon)



    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>NOME</h1>

            <Image
                src={`https://cdn.traction.one/pokedex/pokemon/2.png`}
                width="200"
                height="200"
                alt='NOME'
            />

            <div>
                <h3>Número: </h3>
                <p>#1</p>
            </div>
            <div>
                <h3>Tipo: </h3>
                <div className={styles.types_container} >
                   
                        <span key={1} className={styles.type}>GIT</span>

                    
                </div>

            </div>

            <div  className={styles.data_container}>
                <div className={styles.data_height} >
                    <h4>Altura:</h4>
                    <p>{10 } cm</p>
                </div>

                <div className={styles.data_weight}>
                    <h4>Peso:</h4>
                    <p>{10} kg</p>
                </div>

            </div>

        </div>
    )

}

