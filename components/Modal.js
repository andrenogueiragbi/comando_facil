// index.js
import styles from "../styles/Home.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

export default function Modal ({ message,icon,setOpenModal}) {
  const MySwal = withReactContent(Swal);



  const openErro = () => {
    let timerInterval

    MySwal.fire({
      position: 'top-end',
      icon: icon? icon :'error',
      title: message ? message : '',
      showConfirmButton: false,
      timer: 2000
    

  });

  setOpenModal(t => false)
};



return (

  <>
    {openErro()}
  </>

);
}