// index.js
import styles from "../styles/Home.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

export default function ModalCopy ({ icon, title, timer, timerProgressBar, image, nome, vencimento, valor }) {
  const MySwal = withReactContent(Swal);



  const openErro = () => {
    let timerInterval

    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Comando copiado',
      showConfirmButton: false,
      timer: 1500
    

  });
};



return (

  <>
    {openErro()}
  </>

);
}