import style from './Contact.module.css'
import { MdLocalPhone } from "react-icons/md";
import { FaClock,FaLocationDot  } from "react-icons/fa6";
import { useState } from 'react';
import axios from '../../api/axios'
import { toast } from "react-toastify";
function Contact() {
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [msg,setMsg] = useState("")
  const [error,setError] = useState("")
  const sendMsg = () =>{
    if(!name||!phone||!email||!msg){
      setError("請填寫完整資訊")
      return
    }
    const phoneRegex = /^(09\d{8}|0\d{1,3}-?\d{6,8})$/;
    if (!phoneRegex.test(phone)) {
      setError('電話號碼格式錯誤');
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email格式錯誤');
       return
    }
     if(msg.length > 100) {
       setError('訊息過長');
      return
     }
      axios.post('/api/user/contact', {name,phone,email,msg})
    .then(response => {
      console.log(response.data);
      if(response.data.code=='000'){
        setError("")
        setName("")
        setPhone("")
        setEmail("")
        setMsg("")
        toast.success("已成功發送")
      }
    })
    .catch(error => {
      console.error('Logout failed:', error);
      setError(error.response.data.msg)
    });
  }

    return <div className={style.container}>
      <div className={style.infoContainer}>
        <div className={style.title}>CONTACT INFO</div>
        <div className={style.subTitle}>聯絡資訊</div>
        <div className={style.infos}>
          <div className={style.icon}><MdLocalPhone/></div>
          <div className={style.info}>服務電話:</div>
          <a className={style.content} href="tel:0212345678">02-12345678</a>
        </div>
        <div className={style.infos}>
          <div className={style.icon}><FaClock/></div>
          <div className={style.info}>營業時間:</div>
          <div className={style.content}>11:00 ~ 22:00</div>
        </div>
        <div className={style.infos}>
          <div className={style.icon}><FaLocationDot/></div>
          <div className={style.info}>公司地址:</div>
          <a className={style.content} href="https://maps.app.goo.gl/opccVewqUCRRuFo27" target="blank">台北市信義區信義路五段7號</a>
        </div>
        <div className={style.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57839.97730683263!2d121.48780354863283!3d25.034122200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abe10238cb87%3A0x8c0ca929f18c0d23!2z5Y-w5YyXMTAx!5e0!3m2!1szh-TW!2stw!4v1756451794249!5m2!1szh-TW!2stw"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
      </div>
      </div>
      <div className={style.formContainer}>
        <div className={style.title}>CONTACT FORM</div>
        <div className={style.subTitle}>聯絡表單</div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>姓名</div>
          <input type="text" value={name} onChange={(e) =>setName(e.target.value)} maxLength={20}/>
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>電話</div>
          <input type="text" value={phone} onChange={(e) =>setPhone(e.target.value)}/>
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>信箱</div>
          <input type="text" value={email} onChange={(e) =>setEmail(e.target.value)}/>
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>詳細說明</div>
          <textarea value={msg} onChange={(e) =>setMsg(e.target.value)} maxLength={100}></textarea>
          <div className={style.limit}>{msg.length} / 100</div>
        </div>
        <div className={style.button} onClick={()=>sendMsg()}>送出</div>
        {error && <div className={style.error}>{error}</div>}
      </div>
    </div>
  }
  
  export default Contact;