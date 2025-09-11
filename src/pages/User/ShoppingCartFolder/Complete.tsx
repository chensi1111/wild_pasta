import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import style from './Complete.module.css'
import dayjs from "dayjs";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineLocalPhone,MdOutlineEmail,MdOutlineErrorOutline,MdAccessTime,MdOutlineCalendarMonth  } from "react-icons/md";
function Complete() {
  const navigate = useNavigate()
  const productMap :Record<string, string>= {
    pastaA: "狼嚎辣肉醬麵",
    pastaB: "火吻碳烤雞肉義大利麵",
    pastaC: "荒野蒜香培根麵",
    pastaD: "黑夜墨魚獵人麵",
    pastaE: "烈焰牛排奶油寬扁麵",
    pastaF: "月光蕈菇松露白醬麵",
    pastaG: "血色番茄獵人麵",
    pastaH: "狼群炙燒香腸辣麵",
    pastaI: "野莓鴨胸紅酒筆管麵",
    pastaJ: "煙燻鮭魚野林青醬麵",
    appetizerA: "狼牙洋蔥圈塔",
    appetizerB: "火山熔岩起司球",
    appetizerC: "焦土香料雞翅",
    appetizerD: "野狼抓痕薯條拼盤",
    appetizerE: "炭烤菇菇獵人串",
    appetizerF: "深林香料炸花枝",
    appetizerG: "熾燒辣味雞柳條",
    appetizerH: "迷途羔羊炸乳酪條",
    appetizerI: "炙焰火腿煙燻拼盤",
    appetizerJ: "烈焰辣味義式肉丸",
    dessertA: "焦土熔岩巧克力蛋糕",
    dessertB: "月影烤棉花糖布朗尼",
    dessertC: "森林野莓奶酪",
    dessertD: "炙焰香蕉冰淇淋盅",
    drinkA: "狼煙莓果氣泡飲",
    drinkB: "野性熱紅酒香料茶",
    drinkC: "月下奶酒拿鐵",
    drinkD: "炭火黑糖冷萃咖啡",
    drinkE: "血月石榴冰沙",
  };
  const getProductList = (list: string) => {
  return list
    .split(",")
    .map(item => {
      const [code, qty] = item.split("_");
      const name = productMap[code] || code; 
      return {
        code,          
        name,           
        qty: Number(qty) 
      };
    });
};
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY/MM/DD HH:mm:ss');
  };
  const shoppingStore = useSelector((state: RootState) => state.shopping);
  const memberStore = useSelector((state: RootState) => state.member)
  const productList = getProductList(shoppingStore.orderInfo.list)
  const handleComplete = () =>{
    if(memberStore.login){
      navigate('/user/reserveList')
    }else{
      navigate('/')
    }
  }
  const handleBack = () =>{
    navigate('/user/shopping-cart')
  }
    return <div>
    <div className={style.container}>
      {!shoppingStore.orderInfo.ord_number && <div>
        <div className={classNames(style.checkCircle,style.error)}><MdOutlineErrorOutline/></div>
        <div className={style.formTitle}>訂單錯誤</div>
        <div className={classNames(style.button,style.error)} onClick={()=>handleBack()}>返回</div>
      </div>}
      {shoppingStore.orderInfo.ord_number && <div>
        <div className={style.checkCircle}><FiCheckCircle/></div>
        <div className={style.formTitle}>訂單完成</div>
        <div className={style.formInfo}>以下是您的訂單資訊:</div>
        <div className={style.titles}>
          <div className={style.infoTitle}>訂單標號 : </div>
          <span>{shoppingStore.orderInfo.ord_number}</span>
        </div>
        <div className={style.titles}>
          <div className={style.infoTitle}>下單時間 : </div>
          <span>{formatDate(shoppingStore.orderInfo.ord_time)}</span>
        </div>
        <div className={style.titles}>
          <div className={style.infoTitle}>姓名 : </div>
          <span>{shoppingStore.orderInfo.name}</span>
        </div>
        <div className={style.titles}>
          <div className={style.infoTitle}>取餐日期 : </div>
          <span><MdOutlineCalendarMonth/>{shoppingStore.orderInfo.date}</span>
        </div>
        <div className={style.titles}>
          <div className={style.infoTitle}>取餐時間 : </div>
          <span><MdAccessTime/>{shoppingStore.orderInfo.end_time}</span>
        </div>
        <div className={style.subTitle}>訂購餐點 : </div>
        <div className={style.foods}>
          {productList.map((item) => (
            <li key={item.code} className={style.food}>
              <span className={style.foodName}>{item.name}</span>
              <span className={style.foodQty}> × {item.qty}</span>
            </li>
            ))}
        </div>
        {shoppingStore.orderInfo.remark && <div className={style.remarks}>
          <div className={style.subTitle}>備註 : </div>
          <div className={style.remark}>{shoppingStore.orderInfo.remark}</div>
        </div>}
        {memberStore.login && <div className={style.titles}>
          <div className={style.infoTitle}>小計 : </div>
          <span>$ {shoppingStore.orderInfo.price}</span>
        </div>}
        {memberStore.login && <div className={style.titles}>
          <div className={style.infoTitle}>使用折扣 : </div>
          <span>$ {shoppingStore.orderInfo.discount}</span>
        </div>}
        <div className={classNames(style.titles,style.total)}>
          <div className={style.infoTitle}>總計 : </div>
          <span>$ {(shoppingStore.orderInfo.price - shoppingStore.orderInfo.discount)}</span>
        </div>
        {memberStore.login && <div className={classNames(style.titles,style.point)}>
          <div className={style.infoTitle}>獲得點數 : </div>
          <span>{shoppingStore.orderInfo.point} P</span>
        </div>}
        <div className={style.contact}><MdOutlineLocalPhone/>{shoppingStore.orderInfo.phone_number}</div>
        <div className={style.contact}><MdOutlineEmail/>{shoppingStore.orderInfo.email}</div>
        <div className={style.button} onClick={()=>handleComplete()}>完成</div>
      </div>}
    </div>
  </div>

  }
  
  export default Complete;