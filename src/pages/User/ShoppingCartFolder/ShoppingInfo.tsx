import style from "./ShoppingInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { IoMdArrowDropdownCircle,IoMdArrowDropupCircle } from "react-icons/io";
import { addCount,reduceCount,deleteProduct,useDiscount,cleanProduct } from "../../../store/shoppingSlice";
import { updatePoint } from "../../../store/memberSlice";
import classNames from "classnames";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import axios from "../../../api/axios";
function ShoppingInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const shoppingStore = useSelector((state: RootState) => state.shopping);
  const memberStore = useSelector((state: RootState) => state.member);
  const [point,setPoint]=useState(shoppingStore.discount)
  const [error,setError]=useState("")
  const handleSetPoint = (value: string) => {
  if (/^\d*$/.test(value)) {
    setPoint(Number(value));
  }
};
  const handleDiscount =()=>{
    if(point <= memberStore.userInfo.point && point > 0){
      dispatch(useDiscount(point))
      setError("")
    }else if(point<1){
      dispatch(useDiscount(0))
      setError("")
    }else if (point > memberStore.userInfo.point){
      setError("剩餘點數不足")
    }
  }
  const handleCheckout =()=>{
    if(!shoppingStore.productList.length) return
    if(shoppingStore.count>30) return
    navigate('/user/shopping-cart/check-out')
  }
  const toLogin =()=>{
     navigate(`/login?redirect=${encodeURIComponent('/user/shopping-cart')}`);
  }
  useEffect(()=>{
    const userInfoStr = localStorage.getItem("userInfo");
    if(!userInfoStr) return
    axios.post('/api/user/info')
    .then((res) =>{
      if (res.data.code === '000') {
        console.log(res.data.data)
        dispatch(updatePoint(res.data.data.point))
      }
     })
    .catch(error => {
      console.error('Get point failed:', error);
    })
  },[])
  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <div className={style.title}>商品</div>
        <div className={style.productsContainer}>
          {shoppingStore.productList.map((item) => (
            <div className={style.productContainer} key={item.id}>
              <div className={style.left}>
                <div className={style.pic}><img src={item.pic}/></div>
                <div className={style.name}>{item.name}</div>
              </div>
              <div className={style.right}>
                <div className={style.price}>$ {item.price}</div>
                <div className={style.countContainer}>
                  <div className={style.count} onClick={()=>{dispatch(reduceCount(item))}}><IoMdArrowDropdownCircle/></div>
                  <div className={style.countNumber}>{item.count}</div>
                  <div className={style.count} onClick={()=>{dispatch(addCount(item))}}><IoMdArrowDropupCircle/></div>
                </div>
                <div className={style.total}>$ {item.count*item.price}</div>
                <div className={style.cancel} onClick={()=>{dispatch(deleteProduct(item))}}>X</div>
              </div>
            </div>
          ))}
        </div>
        {!shoppingStore.productList.length &&<div className={style.empty}><span onClick={()=>navigate('/take-out')}>購物車為空，點我前往選購</span></div>}
        <div className={style.buttons}>
          <div className={style.infoButton} onClick={()=>navigate('/take-out')}><MdOutlineArrowBack/><span>繼續選購</span></div>
          <div className={style.infoButton} onClick={()=>dispatch(cleanProduct())}><FaTrashAlt/><span>清空購物車</span></div>
        </div>
      </div>
      <div className={style.payContainer}>
        <div className={style.payTitle}>購物車總計</div>
        <div className={style.payList}>
          <div className={style.listName}>小計</div>
          <div className={style.listCount}>$ {shoppingStore.total}</div>
        </div>
        <div className={style.payList}>
          <div className={style.listName}>折抵</div>
          <div className={style.listCount}>$ {shoppingStore.discount}</div>
        </div>
        <div className={style.payList}>
          <div className={style.listName}>總計</div>
          <div className={style.listCount}>$ {(shoppingStore.total)-(shoppingStore.discount)}</div>
        </div>
        <div className={classNames(style.checkout,(!shoppingStore.productList.length||shoppingStore.count>30) && style.disable)} onClick={()=>handleCheckout()}>前往結帳</div>
        {shoppingStore.count > 30 && <div className={style.error}>訂單超過30筆時，請透過電話提前預約<br/><a href="tel:0212345678">02-12345678</a></div>}
        {!memberStore.login && <div className={style.notice} onClick={()=>toLogin()}>還沒有帳號? 馬上登入開始會員集點</div>}
        {memberStore.login && <div>
          <div className={style.payTitle}>會員點數</div>
          <input type="text" placeholder="點數折抵" value={point === 0 ? "" : point}  onChange={(e) => handleSetPoint((e.target.value))}/>
          <div className={style.discount}>尚有 {memberStore.userInfo.point} 點會員點數</div>
          <div className={classNames(style.checkout,point == 0 && style.disable)} onClick={()=>handleDiscount()}>使用點數</div>
          <div className={classNames(style.checkout,shoppingStore.discount == 0 && style.disable)} onClick={()=>dispatch(useDiscount(0))}>取消使用</div>
          {error && <div className={style.error}>{error}</div>}
        </div>}
      </div>
    </div>
  );
}

export default ShoppingInfo;
