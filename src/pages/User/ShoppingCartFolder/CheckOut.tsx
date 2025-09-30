import style from './CheckOut.module.css'
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { useState,useEffect } from 'react';
import axios from '../../../api/axios';
import { MdOutlineArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
interface timeSlot {
  start:string,
  end:string
}
function CheckOut() {
  const navigate = useNavigate()
  const shoppingStore = useSelector((state: RootState) => state.shopping);
  const count =shoppingStore.count
  const memberStore = useSelector((state:RootState) => state.member);
  const getPoint = (price:number) =>{
    if(memberStore.login){
      return Math.floor(price / 100 * 3);
    }else{
      return 0
    }
    
  }
  const [name,setName] = useState(memberStore.userInfo.name)
  const [phone,setPhone] = useState(memberStore.userInfo.phone)
  const [email,setEmail] = useState(memberStore.userInfo.email)
  const [remark,setRemark] = useState("")
  const [time,setTime] = useState<timeSlot>()
  const [timeList,setTimeList] = useState<timeSlot[]>([])
  const [date,setDate] = useState("")
  const [error,setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [timeSlotLoading, setTimeSlotLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const getTimeSlot = ()=>{
    setTimeSlotLoading(true)
    axios.post('/api/takeout/time', { count })
    .then((res) => {
        console.log(res.data);
        if (res.data.code === '000') {
          setTimeList(res.data.data.availableTimes)
          setDate(res.data.data.today)
       }
     })
    .catch(error => {
        console.error('Error fetching time slots:', error);
     })
    .finally(()=>{
      setTimeSlotLoading(false)
    })
  }
  const setTimeSlot = (timeSlot: timeSlot) => {
    const formatTimeSlot = {
      start: timeSlot.start.slice(0, 5),
      end: timeSlot.end.slice(0, 5)
   };
    setTime(formatTimeSlot);
  };
  const handleSetRemark =(remark:string) =>{
    if(remark.length<=100){
      setRemark(remark)
    }
  }
  const pay = () =>{
    if(!name||!phone||!email){
      setError('請填寫完整資料')
      return
    }
    if(!time){
      setError('請選擇取餐時間')
      return
    }
    if(name.length > 20){
      setError('姓名不得超過20個字元')
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
    if(remark.length>100){
      setError('備註不得超過100個字元')
      return
    }
    if(count<1){
      setError('購物車為空')
      return
    }
    const list = shoppingStore.productList.map(item => `${item.id}_${item.count}`).join(',');
    const price = shoppingStore.total
    const discount = shoppingStore.discount
    setLoading(true)
    axios.post('/api/takeout/pay',{
      userId:memberStore.userInfo.userId,
      name,
      date,
      start_time:time?.start,
      end_time:time?.end,
      list,
      count,
      price,
      discount,
      point:getPoint(price),
      remark,
      phone_number:phone,
      email
    })
    .then((res) =>{
      console.log(res.data);
        if (res.data.code === '000') {
          console.log(res.data.data)
          const div = document.createElement('div');
          div.innerHTML = res.data.data;
          const form = div.querySelector('form');
          if (!form) {
            console.error("沒有找到 form，回傳內容:", res.data.data);
            return;
          }        
          document.body.appendChild(form);
          form.submit();
       }
    })
    .catch(error => {
        console.error('Order failed:', error);
        setError(error.response.data.msg)
    })
    .finally(()=>{
      setLoading(false)
    })
  }
  useEffect(()=>{
    getTimeSlot()
  },[])
    return <div className={style.container}>
      {showAlert && <div className={style.alertContainer}>
        <div className={style.alertTitle}>提醒</div>
        <div className={style.alertExplain}>此為綠界模擬付款功能，無法使用真實信用卡付款</div>
        <div className={style.alertExplain}>請使用以下測試資料:</div>
        <div className={style.alertInfos}>
          <div className={style.alertInfo}><span>卡號:</span>4311-9511-1111-1111</div>
          <div className={style.alertInfo}><span>有效月年:</span>01/35</div>
          <div className={style.alertInfo}><span>安全碼:</span>111</div>
        </div>
        <div className={style.alertButtons}>
          <div className={style.alertButton} onClick={()=>setShowAlert(false)}>取消</div>
          <div className={style.alertButton} onClick={()=>pay()}>確定</div>
        </div>
      </div>}
      <div className={style.infoContainer}>
        <div className={style.top}>
          <div className={style.title}>購物須知</div>
          <div className={style.ruleContent}>親愛的顧客您好，請詳閱以下購物規則:</div>
            <li className={style.ruleInfo}><span>餐點數量 : </span>餐點總數超過30道，請提前一天來電訂購</li>
            <li className={style.ruleInfo}><span>付款方式 : </span>使用信用卡線上付款</li>
            <li className={style.ruleInfo}><span>特殊需求 : </span>如有特殊需求，請於備註欄告知</li>
            <li className={style.ruleInfo}><span>外帶取消 : </span>請提前於取餐時間前90分鐘進行取消</li>
          <div className={classNames(style.ruleContent,style.last)}>感謝您的配合，期待您的光臨</div>
        </div>
        <div className={style.bottom}>
            <div className={style.userInfos}>
          <div className={style.title}>顧客資訊</div>
          <div className={style.infoInputContainer}>
            <div className={style.inputTitle}>姓名</div>
            <input type="text" className={style.infoInput} value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className={style.infoInputContainer}>
            <div className={style.inputTitle}>電話</div>
            <input type="text" className={style.infoInput} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          </div>
          <div className={style.infoInputContainer}>
            <div className={style.inputTitle}>信箱</div>
            <input type="text" className={style.infoInput} value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className={style.textareaContainer}>
            <div className={style.inputTitle}>備註</div>
            <textarea value={remark} onChange={(e)=>handleSetRemark(e.target.value)}></textarea>
            <div className={style.remarkNotice}>{remark.length} / 100</div>
        </div>
        </div>
        <div className={style.orderInfos}>
          <div className={style.title}>選擇取餐時間</div>
          <div className={style.timeContainer}>
            {timeList.map((item) => (
              <div key={item.end} className={classNames(style.timeItem,(item.end).slice(0,5) === time?.end && style.active)} onClick={()=>setTimeSlot(item)}>
                {(item.end).slice(0,5)}
              </div>
            ))}
            {!timeSlotLoading && !timeList.length && 
            <div className={style.errorMsg}>目前取餐時間皆已滿</div>            
            }
          </div>
          {!timeSlotLoading && <div className={style.refresh} onClick={()=>getTimeSlot()}>更新取餐時間</div>}
          {timeSlotLoading && <div className={style.refresh}><div className={style.spin}><FaSpinner/></div></div>}
        </div>
        </div>
      </div>
      <div className={style.detailContainer}>
        <div className={style.title}>您的訂單</div>
        <div className={classNames(style.detailSubTitle,style.bold)}>商品<span>價格</span></div>
        <div className={style.productContainer}>
          {shoppingStore.productList.map((item) => (
            <div key={item.id} className={style.productList}>
              <div>{item.name} X {item.count}</div>
              <div className={style.price}>$ {(item.price)*(item.count)}</div>
            </div>
          ))}
        </div>
        <div className={style.detailSubTitle}>小計<span className={style.price}>$ {shoppingStore.total}</span></div>
        <div className={style.detailSubTitle}>折扣<span className={style.price}>$ {shoppingStore.discount}</span></div>
        <div className={classNames(style.detailSubTitle,style.bold)}>總計<span className={style.price}>$ {(shoppingStore.total)-(shoppingStore.discount)}</span></div>
        {memberStore.login && <div className={style.detailSubTitle}>本次新增點數<span className={style.price}> {getPoint((shoppingStore.total)-(shoppingStore.discount))} P</span></div>}
        <div className={style.detailSubTitle}>取餐時間<span className={style.price}>{time?.end}</span></div>
        {!loading && <div className={style.confirm} onClick={()=>setShowAlert(true)}>前往付款</div>}
        {loading && <div className={style.confirm}><div className={style.spin}><FaSpinner/></div></div>}
        <div className={style.back} onClick={()=>navigate('/user/shopping-cart')}><span><MdOutlineArrowBack/></span>返回購物車</div>
        <div className={style.errorMsg}>{error}</div>
      </div>
    </div>
  }
  
  export default CheckOut;