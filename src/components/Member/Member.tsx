import style from './Member.module.css';
import type { RootState } from "../../store/store";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import axios from '../../api/axios';
import { clearUserInfo,setLoginType,closeBox } from '../../store/memberSlice.ts';
import { toast } from "react-toastify";
function Member() {
    const dispatch = useDispatch()
    const memberStore = useSelector((state: RootState) => state.member);
    const shoppingStore = useSelector((state: RootState) =>state.shopping)
    const navigate = useNavigate();
    const handleNavigate = (path:string)=>{
      dispatch(closeBox())
        navigate(path)
    }
    const handleLogOut = ()=>{
      axios.post('/api/user/logout')
    .then(response => {
      console.log(response.data);
      if(response.data.code=='000'){
        localStorage.removeItem('userInfo')
        dispatch(clearUserInfo())
        dispatch(setLoginType(false))
        handleNavigate('/login')
      }
    })
    .catch(error => {
      console.error('Logout failed:', error);
      toast.error(error.response.data.msg)
    });
    }
    return (
      <div className={classNames(style.container,memberStore.open && style.activate)}>
        {!memberStore.login && <>
        <div className={style.nav} onClick={()=>handleNavigate('/login')}>登入</div>
        <div className={style.nav} onClick={()=>handleNavigate('/register')}>註冊</div>
        </>
        }
        <div className={style.nav} onClick={()=>handleNavigate('/user/shopping-cart')}>購物車{shoppingStore.productList.length>0 && <span>{shoppingStore.productList.length}</span>}</div>
        {memberStore.login && <>
          <div className={style.nav} onClick={()=>handleNavigate('/user/info')}>個人資訊</div>
          <div className={style.nav} onClick={()=>handleNavigate('/user/reserveList')}>查詢訂單</div>
          <div onClick={()=>handleLogOut()} className={style.nav}>登出</div>
        </>}
      </div>
    )
  }
  
  export default Member