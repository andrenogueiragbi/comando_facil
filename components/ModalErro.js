// index.js
import styles from "../styles/Home.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

export default function ModalCopy ({ setFailLogin }) {
  const MySwal = withReactContent(Swal);



  const openErro = () => {
    let timerInterval

    MySwal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Login e/ou senha inválido',
      showConfirmButton: false,
      timer: 2000
    

  });

  setFailLogin(t => false)
};



return (

  <>
    {openErro()}
  </>

);
}