import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Command.module.css'
import { useRouter } from 'next/router'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useState } from "react";
import ModalCopy from "../../components/ModalCopy";


export async function getServerSideProps(context) {
    const id = context.params.title_id


    const link = 'http://localhost:5000'


    const resultCommand = await fetch(`${link}/commands/title/${id}`)
    const dataCommand = await resultCommand.json()


    return {
        props: {
            command: dataCommand.data
        }
    }

}




export default function Pokemon({ command }) {
    const router = useRouter()

    const [copy, setCopy] = useState(false);

    const handerCopy = () =>{
        setCopy(!copy)

    }


    return (
        <div className={styles.pokemon_container}>

            {copy && <ModalCopy />}


            <h1 className={styles.title}>
                Comando title de <a href="https://nextjs.org">Platform</a>
            </h1>

            {
                command.length > 0 ?
                    command.map((item) => (

                        <div key={item.id}>
                            <div className={styles.data_bottom} >



                                <div className={styles.types_container} >

                                    <p className={styles.description}>
                                        <code className={styles.code}>{item.commands}</code>

                                        <CopyToClipboard text={item.commands}
                                            onCopy={() => handerCopy()}>
                                            <button className={styles.btn_copy} >copiar</button>
                                        </CopyToClipboard>
                                    </p>
                                </div>

                                <div>

                                    <h3>{item.description} </h3>


                                </div>



                                <div className={styles.data_container}>
                                    <div className={styles.data_height} >
                                        <h4>Tags:</h4>
                                        <p>{item.tags}</p>
                                    </div>

                                    <div className={styles.data_weight}>
                                        <h4>Criador:</h4>
                                        <p>{item.creator}</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))
                    :
                    <>
                        <h1 className={styles.info_null} >😌  Sem tipos de comandos por aqui.</h1>
                        <button onClick={() => router.back()} className={styles.btn_go_back}>voltar!</button>


                    </>

            }


        </div>
    )

}

