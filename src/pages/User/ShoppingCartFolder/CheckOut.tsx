import style from './CheckOut.module.css'
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { useState,useEffect } from 'react';
import axios from '../../../api/axios';
import { setOrderInfo,cleanProduct,useDiscount } from '../../../store/shoppingSlice';
import { MdOutlineArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { toast } from 'react-toastify';
interface timeSlot {
  start:string,
  end:string
}
function CheckOut() {
  const dispatch = useDispatch();
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
  const order = () =>{
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
    axios.post('/api/takeout/order',{
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
          navigate('/user/shopping-cart/complete')
          dispatch(setOrderInfo(res.data.data))
          dispatch(cleanProduct())
          dispatch(useDiscount(0))
          toast.success("訂單已完成")
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
  const test = () =>{
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
      <div className={style.infoContainer}>
        <div className={style.userInfos}>
          <div className={style.infoInputContainer}>
            <div className={style.infoInputTitle}>姓名</div>
            <input type="text" className={style.infoInput} value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className={style.infoInputContainer}>
            <div className={style.infoInputTitle}>電話</div>
            <input type="text" className={style.infoInput} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          </div>
          <div className={style.infoInputContainer}>
            <div className={style.infoInputTitle}>信箱</div>
            <input type="text" className={style.infoInput} value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className={style.textareaContainer}>
            <div className={style.infoInputTitle}>備註</div>
            <textarea value={remark} onChange={(e)=>handleSetRemark(e.target.value)}></textarea>
            <div className={style.remarkNotice}>{remark.length} / 100</div>
        </div>
        <div className={style.back} onClick={()=>navigate('/user/shopping-cart')}><span><MdOutlineArrowBack/></span>返回購物車</div>
        </div>
        <div className={style.orderInfos}>
          <div className={style.infoInputTitle}>選擇取餐時間</div>
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
      <div className={style.detailContainer}>
        <div className={style.detailTitle}>您的訂單</div>
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
        {!loading && <div className={style.confirm} onClick={()=>order()}>下單購買</div>}
        {!loading && <div className={style.confirm} onClick={()=>test()}>綠界測試</div>}
        {loading && <div className={style.confirm}><div className={style.spin}><FaSpinner/></div></div>}
        <div className={style.errorMsg}>{error}</div>
      </div>
    </div>;
  }
  
  export default CheckOut;