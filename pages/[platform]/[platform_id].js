import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Platform.module.css'
import { useRouter } from 'next/router'


export async function getServerSideProps(context) {
    const id = context.params.platform_id

    const link = 'http://localhost:5000'


    const resultTitle = await fetch(`${link}/title/platform/${id}`)
    const dataTitle = await resultTitle.json()

    return {
        props: {
            title: dataTitle.data,
            platform_id:id
        }
    }



}





export default function Comandos({  title,platform_id }) {

    const router = useRouter()


    return (
        <div className={styles.pokemon_container}>

            {title.length > 0 ?
                <>
                    <h1 className={styles.title}>{title[0].platform.name}</h1>

                    <Image
                        src={title[0].platform.avatar ? title[0].platform.avatar : 'https://www.freepnglogos.com/uploads/warning-sign-png/image-warning-sign-elena-avalor-21.png'}
                        width="200"
                        height="200"
                        alt={title[0].platform.name}
                    />
                </>

                :
                false

            }



            <div>


                {
                    title.length > 0 &&
                    <>
                        <h3>Descrição: </h3>
                        <div>

                            <p>{title[0].platform.name}</p>
                        </div>
                    </>
                }





                <div className={styles.types_container} >

                    {title.length > 0 ?
                        title.map((item) => (
                            <span key={item.id} className={styles.type}>
                                <Link legacyBehavior href={`/${item.platform.name}/${platform_id}/command/${item.title}/${item.id}`}>
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

