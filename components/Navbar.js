import Link from 'next/link';
import Image from 'next/image';
import style from '../styles/Navbar.module.css';


export default function Navbar() {
 return (
   <nav className={style.navbar}>
    <div className={style.logo}>
        <Image src='/images/pokeball.png' width={30} height={30} alt='pokeball'/>
        <h1>Comando Fácil</h1>
    </div>

    <ul className={style.link_items}>
        <li>
            <Link legacyBehavior href={'/'}><a>Home</a></Link>
        </li>

        <li>
            <Link legacyBehavior href={'/about'}><a>Sobre</a></Link>
        </li>
    </ul>

   </nav>
 );
}