import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import style from './ScrollUp.module.css'

export default function ScrollUp() {
  const { pathname } = useLocation();
  const scrollUp =()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scrollUp()
  }, [pathname]);

  return <div className={style.scroll} onClick={()=>scrollUp()}>
    <MdOutlineKeyboardDoubleArrowUp/>
  </div>;
}