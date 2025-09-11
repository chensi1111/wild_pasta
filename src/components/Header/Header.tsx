import { useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import { MdAccountCircle,MdMenu,MdClose  } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toggleBox,closeBox } from "../../store/memberSlice";
import { toggleBurger,closeBurger } from "../../store/burgerSlice";
import { useWindowSize } from '../../hooks/useWindowSize';
import type { RootState } from "../../store/store.ts";
import { useSelector } from "react-redux";
import logo from '../../assets/logo.webp';
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (path: string) => {
      navigate(path);
    }
    const { width } = useWindowSize();
    const burgerStore = useSelector((state: RootState) => state.burger);
    const openBurger = ()=>{
      dispatch(toggleBurger())
      dispatch(closeBox())
    }
    const openMember = ()=>{
      dispatch(toggleBox())
      dispatch(closeBurger())
    }

    return (
      <div className={style.container}>
        <div className={style.navContainer}>
          <div className={style.logo} onClick={() => handleClick('/')}>
            <img src={logo}/>
            <span>WILD PASTA</span>
          </div>
          {width>= 1024 && <div className={style.navs}>
            <div className={style.nav} onClick={() => handleClick('/about')}>關於Wild</div>
            <div className={style.nav} onClick={() => handleClick('/menu')}>野性菜單</div>
            <div className={style.nav} onClick={() => handleClick('/reserve')}>立即訂位</div>
            <div className={style.nav} onClick={() => handleClick('/take-out')}>我要外帶</div>
            <div className={style.nav} onClick={() => handleClick('/contact')}>聯絡我們</div>
            <div className={style.member} onClick={() => openMember()}><div className={style.icon}><MdAccountCircle/></div></div>
          </div>}
          {width<1024 && <div className={style.icons}>
            <div className={style.burger} onClick={() => openBurger()}>
              {!burgerStore.open && <div className={style.icon}><MdMenu/></div>}
              {burgerStore.open && <div className={style.icon}><MdClose/></div>}
            </div>
            <div className={style.member} onClick={() => openMember()}><div className={style.icon}><MdAccountCircle/></div></div>
            </div>}
        </div>
      </div>
    )
  }
  
  export default Header
  