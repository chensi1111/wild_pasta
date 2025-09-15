import classNames from "classnames";
import style from './Register.module.css';
import { MdOutlinePersonOutline,MdLock,MdMailOutline,MdPerson,MdCheckBox,MdCheckBoxOutlineBlank } from "react-icons/md";
import { LuEye,LuEyeClosed } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import { useState,useEffect } from 'react';
import axios from '../../api/axios.ts'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Register() {
  const navigate = useNavigate();
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpenCheck, setEyeOpenCheck] = useState(false);
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [warnMsg, setWarnMsg] = useState("");
  const [warnType, setWarnType] = useState("");
  const [passwordValidLength,setPasswordValidLength] = useState(false)
  const [passwordValidLetter,setPasswordValidLetter] = useState(false)
  const [passwordValidSame,setPasswordValidSame] = useState(false)
  const [accountValidLength,setAccountValidLength] = useState(false)
  const [accountValidChars,setAccountValidChars] = useState(false)
  const [emailValidFormat,setEmailValidFormat] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggleEyeOpen = () => {
    setEyeOpen(prev => !prev);
  };
  const toggleEyeOpenCheck = () => {
    setEyeOpenCheck(prev => !prev);
  };
  const checkPassword = () => {
    // 驗證是否至少 8 位
    const lengthValid = password.length >= 8;
    setPasswordValidLength(lengthValid);
    // 驗證是否包含至少一個英文字母
    const letterValid = /[A-Za-z]/.test(password);
    setPasswordValidLetter(letterValid);
  };
  const checkCheckPassword = () => {
    // 驗證密碼是否相同
    const sameValid = password===passwordCheck
    setPasswordValidSame(sameValid)
  }
  const checkAccount = () =>{
    // 驗證4~20位數
    const lengthValid = account.length >= 4 && account.length <= 20;
    setAccountValidLength(lengthValid)
    // 驗證不包含底線以外之特殊符號
    const isValidAccountChars = /^[a-zA-Z0-9_]+$/.test(account);
    setAccountValidChars(isValidAccountChars)
  }
  const checkEmail = () => {
    // 驗證email格式
    const formatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setEmailValidFormat(formatValid)
  }
  const handleRegister = () =>{
    if(!name||!email||!account||!password||!passwordCheck) return
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValidEmail) {
      setWarnMsg("Email格式錯誤");
      setWarnType("email")
      return;
    }
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
    if(password!==passwordCheck){
      setWarnMsg("密碼不相符");
      setWarnType("password")
      return
    }
    setLoading(true)
    axios.post('/api/user/register', {
      name,
      email,
      account,
      password
    })
    .then(response => {
      console.log(response.data);
      if(response.data.code=='000'){
        console.log('註冊成功')
        toast.success('註冊成功')
        navigate('/login')
      }
    })
    .catch(error => {
      console.error('Register failed:', error);
      setWarnMsg(error.response.data.msg)
    })
    .finally(()=>{
      setLoading(false)
    });
  }
  useEffect(()=>{
    checkPassword()
  },[password])
  useEffect(()=>{
    checkAccount()
  },[account])
  useEffect(()=>{
    checkCheckPassword()
  },[passwordCheck,password])
  useEffect(()=>{
    checkEmail()
  },[email])
  useEffect(()=>{
    axios.post('/api/system/pin')
  },[])
    return <div className={classNames(style.wrapper)}>
    <div onKeyDown={(e) => {if (e.key === "Enter") {handleRegister()}}} className={classNames(style.container)}>
      <div className={classNames(style.title)}>註冊</div>
      <div className={classNames(style.inputContainer)}>
        <div className={classNames(style.inputTitle)}>姓名</div>
        <div className={classNames(style.inputBox)}>
          <div className={classNames(style.icon)}><MdPerson/></div>
          <input className={classNames(style.input,warnType=='name' && style.wrong)} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="請輸入姓名" maxLength={20}/>
        </div>
      </div>
      <div className={classNames(style.inputContainer)}>
        <div className={classNames(style.inputTitle)}>Email</div>
        <div className={classNames(style.inputBox)}>
          <div className={classNames(style.icon)}><MdMailOutline/></div>
          <input className={classNames(style.input,warnType=='email' && style.wrong)} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="請輸入Email" />
        </div>
        <div className={style.verifyChecks}>
          {email.length !=0 && <div className={classNames(style.verifyCheck,!emailValidFormat && style.valid)}><span>{emailValidFormat ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</span>符合Email格式</div>}
        </div>
      </div>
      <div className={classNames(style.inputContainer)}>
        <div className={classNames(style.inputTitle)}>帳號</div>
        <div className={classNames(style.inputBox)}>
          <div className={classNames(style.icon)}><MdOutlinePersonOutline/></div>
          <input className={classNames(style.input,warnType=='account' && style.wrong)} type="text" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="請輸入帳號" />
        </div>
        <div className={style.verifyChecks}>
          {account.length !=0 && <div className={classNames(style.verifyCheck,!accountValidLength && style.valid)}><span>{accountValidLength ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</span>長度4~20位數</div>}
          {account.length !=0 && <div className={classNames(style.verifyCheck,!accountValidChars && style.valid)}><span>{accountValidChars ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</span>不得包含_以外之特殊符號</div>}
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
        <div className={style.verifyChecks}>
          {password.length !=0 && <div className={classNames(style.verifyCheck,!passwordValidLetter && style.valid)}><span>{passwordValidLetter ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</span>包含英文字母</div>}
          {password.length !=0 && <div className={classNames(style.verifyCheck,!passwordValidLength && style.valid)}><span>{passwordValidLength ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</span>長度8位數以上</div>}
        </div>
      </div>
      <div className={classNames(style.inputContainer)}>
        <div className={classNames(style.inputTitle)}>確認密碼</div>
        <div className={classNames(style.inputBox)}>
          <div className={classNames(style.icon)}><MdLock/></div>
          <input className={classNames(style.input,warnType=='password' && style.wrong)} type={eyeOpenCheck ? "text" : "password"} value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} placeholder="請再次輸入密碼" />
          {eyeOpenCheck && <div onClick={()=>toggleEyeOpenCheck()} className={classNames(style.eye)}><LuEye/></div>}
          {!eyeOpenCheck && <div onClick={()=>toggleEyeOpenCheck()} className={classNames(style.eye)}><LuEyeClosed/></div>}
        </div>
        <div className={style.verifyChecks}>
          {passwordCheck.length !=0 && <div className={classNames(style.verifyCheck,!passwordValidSame && style.valid)}><span>{passwordValidSame ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</span>兩次密碼相同</div>}
        </div>
      </div>
      <div className={classNames(style.warn)}>{warnMsg}</div>
      {!loading && <div onClick={()=>handleRegister()} className={classNames(style.button,name.length && email.length && account.length && password.length && passwordCheck.length && style.access)}>註冊</div>}
      {loading && <div className={classNames(style.button,style.access)}><div className={style.spin}><FaSpinner/></div></div>}
    </div>
    </div>;
  }
  
  export default Register;