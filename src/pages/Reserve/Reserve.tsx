import style from "./Reserve.module.css";
import ReserveBox from "../../components/ReserveBox/ReserveBox";
import { useEffect,useState } from "react";
import { openBox,closeBox } from "../../store/reserveSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import classNames from "classnames";
import axios from '../../api/axios.ts'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
function Reserve() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(openBox());
    return () => {
      dispatch(closeBox());
    };
  }, []);
  const memberStore = useSelector((state: RootState) => state.member);
  const reserveStore = useSelector((state: RootState) => state.reserve);
  const [name, setName] = useState(memberStore.userInfo.name || '');
  const [phone_number, setPhoneNumber] = useState(memberStore.userInfo.phone || '');
  const [email, setEmail] = useState(memberStore.userInfo.email || '');
  const [food_allergy, setFoodAllergy] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false)
  const completeReserve = () => {
    if(reserveStore.info.date === '' || reserveStore.info.time === '' || reserveStore.info.people === 0) {
      setErrorMsg('請先選擇日期、時間和人數');
      return;
    }else if(name === '') {
      setErrorMsg('請輸入姓名');
      return;
    }else if(phone_number === '') {
      setErrorMsg('請輸入電話號碼');
      return;
    }else{
      setErrorMsg('');
      const finalReserveInfo = {
        ...reserveStore.info,
        theme: reserveStore.info.theme?.id,
        name,
        phone_number,
        email,
        food_allergy,
      }
      setLoading(true)
      axios.post('/api/reserve',finalReserveInfo)
      .then((res) => {
        console.log(res.data);
        if(res.data.code === '000'){
          console.log('訂位成功')
          toast.success('訂位成功');
          navigate('/user/reserveList')
        }
      })
      .catch(error => {
      console.error('Reserve failed:', error);
      setErrorMsg(error.response.data.msg);
      })
      .finally(()=>{
        setLoading(false)
      });;
    }
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.reserveContainer}>
          <div className={style.top}>
            <div className={style.pic}></div>
            <div className={style.info}>
              <div className={style.title}>Wild Pasta</div>
              <div className={style.address}>台北市信義區信義路五段7號</div>
            </div>
          </div>
          <div className={style.dateContainer}>
            <div className={style.dateInfos}>
              <div className={style.dateInfo}>
              <span>{reserveStore.info.date}</span>日期
            </div>
            <div className={style.dateInfo}>
              <span>{reserveStore.info.time}</span>時間
            </div>
            <div className={style.dateInfo}>
              <span>{reserveStore.info.people}</span>位
            </div>
            </div>
            
            <div className={style.edit} onClick={() => dispatch(openBox())}>
              修改
            </div>
          </div>
          {reserveStore.info.theme && reserveStore.info.theme.name && <div className={style.themeContainer}>
              <div className={style.themeItem}>
                {reserveStore.info.theme.name}
              </div>
          </div>}
          <div className={style.remindTitle}>備註</div>
          <div className={style.remind}>{reserveStore.info.remark}</div>
        </div>
        <div className={style.reserveContainer}>
          <div className={style.contactContainer}>
            <div className={style.reserveTitle}>訂位人資料</div>
            <div className={style.infoContainer}>
              <div className={classNames(style.infoTitle,style.required)}>姓名
              </div>
              <input type="text" value={name} placeholder="請輸入姓名" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={style.infoContainer}>
              <div className={classNames(style.infoTitle,style.required)}>電話號碼</div>
                <input type="text" value={phone_number} onChange={(e) => {const val = e.target.value;if (/^\d*$/.test(val)) {setPhoneNumber(val);}}} placeholder="請輸入電話號碼" />
            </div>
            <div className={style.infoContainer}>
              <div className={classNames(style.infoTitle,style.required)}>Email</div>
              <input type="text" value={email} placeholder="請輸入Email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={style.infoContainer}>
              <div className={style.infoTitle}>過敏備註</div>
              <input type="text" value={food_allergy} onChange={(e) => setFoodAllergy(e.target.value)} placeholder="ex.蝦" maxLength={50}/>
            </div>
            {!loading && <div onClick={()=>completeReserve()} className={style.sendReserve}>立即訂位</div>}
            {loading && <div className={style.sendReserve}><div className={style.spin}><FaSpinner/></div></div>}
            <div className={style.errorMsg}>{errorMsg}</div>
          </div>
        </div>
        <ReserveBox></ReserveBox>
      </div>
      ;
    </>
  );
}

export default Reserve;
