// index.js
import styles from "../styles/Home.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

export default function ModalCopy ({ setFailLoginNull,failLoginNull }) {
  const MySwal = withReactContent(Swal);



  const openErro = () => {
    let timerInterval

    MySwal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Login e/ou senha vazios',
      showConfirmButton: false,
      timer: 2000
    

  });

  setFailLoginNull(t => !failLoginNull)
};



return (

  <>
    {openErro()}
  </>

);
}