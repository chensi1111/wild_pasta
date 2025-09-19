import classNames from "classnames";
import style from './Login.module.css';
import { MdOutlinePersonOutline,MdLock } from "react-icons/md";
import { LuEye,LuEyeClosed } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import { useState,useEffect } from 'react';
import axios from '../../api/axios.ts'
import { useDispatch } from 'react-redux';
import { setUserInfo,setLoginType } from "../../store/memberSlice";
import { setShoppingAccount,initShoppingCart } from "../../store/shoppingSlice.ts";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { UAParser } from 'ua-parser-js';
const parser = new UAParser();
const result = parser.getResult();
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eyeOpen, setEyeOpen] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [warnMsg, setWarnMsg] = useState("");
  const [warnType, setWarnType] = useState("");
  const [loading, setLoading] =useState(false)
  const toggleEyeOpen = () => {
    setEyeOpen(prev => !prev);
  };
  const handleLogin = () =>{
    if(!account||!password) return
    const isValidAccount = /^[a-zA-Z0-9_]{4,20}$/.test(account);
    if (!isValidAccount) {
      setWarnMsg("帳號需長度介於4到20字元之間，且不包含底線以外之特殊符號");
      setWarnType("account")
      return;
    }
    const isValidPassword = /^(?=.*[A-Za-z]).{8,}$/.test(password);
    if (!isValidPassword) {
      setWarnMsg("密碼需至少8字元，且包含至少一個英文字母");
      setWarnType("password")
      return;
    }
    setLoading(true)
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }
    const deviceName = `${result.os.name} - ${result.browser.name}`; 
    axios.post('/api/user/login', {
      account,
      password,
      deviceId,
      deviceName
    })
    .then(response => {
      console.log(response.data);
      if(response.data.code=='000'){
        const userInfo = response.data.data
        console.log('成功登入')
        toast.success('登入成功');
        dispatch(setUserInfo(userInfo))
        dispatch(setLoginType(true))
        dispatch(setShoppingAccount(account))
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        // 獲取該帳號的購物車資訊
        const shoppingCartStr = localStorage.getItem(`${account}_productList`)
        const shoppingCart =shoppingCartStr ? JSON.parse(shoppingCartStr) : [];
        dispatch(initShoppingCart(shoppingCart))
        // 跳轉回登入前的頁面
        const redirect = new URLSearchParams(location.search).get('redirect') || '/';
        navigate(redirect); 
      }
    })
    .catch(error => {
      console.error('Login failed:', error);
      setWarnMsg(error.response.data.msg)
    })
    .finally(()=>{
      setLoading(false)
    });
  }
  useEffect(()=>{
      axios.post('/api/system/pin')
    },[])
  useEffect(()=>{
    const msg = localStorage.getItem("toastMessage");
      if (msg) {
        toast.error(msg);
        localStorage.removeItem("toastMessage");
      }
  },[])
    return <div className={classNames(style.wrapper)}>
    <div onKeyDown={(e) => {if (e.key === "Enter") {handleLogin()}}} className={classNames(style.container)}>
      <div className={classNames(style.title)}>登入</div>
      <div className={classNames(style.inputContainer)}>
        <div className={classNames(style.inputTitle)}>帳號</div>
        <div className={classNames(style.inputBox)}>
          <div className={classNames(style.icon)}><MdOutlinePersonOutline/></div>
          <input className={classNames(style.input,warnType=='account' && style.wrong)} type="text" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="請輸入帳號" />
        </div>
      </div>
      <div className={classNames(style.inputContainer)}>
        <div className={classNames(style.inputTitle)}>密碼</div>
        <div className={classNames(style.inputBox)}>
          <div className={classNames(style.icon)}><MdLock/></div>
          <input className={classNames(style.input,warnType=='password' && style.wrong)} type={eyeOpen ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="請輸入密碼" />
          {eyeOpen && <div onClick={()=>toggleEyeOpen()} className={classNames(style.eye)}><LuEye/></div>}
          {!eyeOpen && <div onClick={()=>toggleEyeOpen()} className={classNames(style.eye)}><LuEyeClosed/></div>}
        </div>
      </div>
      <div className={classNames(style.warn)}>{warnMsg}</div>
      {!loading && <div onClick={()=>handleLogin()} className={classNames(style.button,account.length && password.length && style.access)}>登入</div>}
      {loading && <div className={classNames(style.button,style.access)}><div className={style.spin}><FaSpinner/></div></div>}
      <div className={style.functions}>
        <div className={style.function} onClick={()=>navigate('/register')}>註冊帳號</div>
        <div className={style.function} onClick={()=>navigate('/forgot-password')}>忘記密碼</div>
      </div>
    </div>
    </div>;
  }
  
  export default Login;