import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/About.module.css";
import { useState, useEffect } from "react"



export default function About() {



    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <h1 className={styles.title} >Comando<span>Next</span></h1>

                <h2>ComandoNext é um App construído em Next.js, nodejs, ORM sequelize, banco de dados PostgreSQL. O intuído da aplicação é reunir todos os comandos das mais diferentes plataformas e tecnologia em um único lugar, podendo ser consultado e tirando as dúvidas.
                    Voltado para ajudar o usuário a lembrar daqueles comandos que não é usado muito no dia-a-dia e acaba esquecendo, ComandoNext irá ajudar nisso.
                </h2>

                <div className={styles.link}>
                    <p><Link legacyBehavior href={'https://github.com/andrenogueiragbi/comando_facil_api'}><a> Repositótio API  <Image className={styles.imgTec} src='https://img.shields.io/badge/-Node.js-000?&logo=node.js' width={85} height={20} /></a></Link></p>
                    <p><Link legacyBehavior href={'https://github.com/andrenogueiragbi/comando_facil_front'}><a>Repositótio Front <Image className={styles.imgTec} src='https://img.shields.io/badge/-Next.js-000?&logo=next.js' width={85} height={20} /></a></Link></p>
                    <p><Link legacyBehavior href={'https://render.com/'}><a>Cloud Computing <Image className={styles.imgTec} src='https://img.shields.io/badge/-Render-000?&logo=render' width={85} height={20} /></a></Link></p>
                    <p><Link legacyBehavior href={'https://github.com/andrenogueiragbi'}><a>André Nogueira <Image className={styles.imgTec} src='https://img.shields.io/badge/-Github-000?&logo=github' width={85} height={20} /></a></Link></p>


                </div>


            </div>


            <Image className={styles.img} src='https://avatars.githubusercontent.com/u/61439992?s=400&u=2f1eabb1caabfd7e610198837128209fd7512032&v=4' width={300} height={300} />
        </div>


    );
}