import style from "./TakeOut.module.css";
import { useState,useRef,useEffect } from 'react';
import { motion } from "framer-motion";
import pastaA from '../../assets/food/pastaA.webp'
import pastaB from '../../assets/food/pastaB.webp'
import pastaC from '../../assets/food/pastaC.webp'
import pastaD from '../../assets/food/pastaD.webp'
import pastaE from '../../assets/food/pastaE.webp'
import pastaF from '../../assets/food/pastaF.webp'
import pastaG from '../../assets/food/pastaG.webp'
import pastaH from '../../assets/food/pastaH.webp'
import pastaI from '../../assets/food/pastaI.webp'
import pastaJ from '../../assets/food/pastaJ.webp'
import appetizerA from '../../assets/food/appetizerA.webp'
import appetizerB from '../../assets/food/appetizerB.webp'
import appetizerC from '../../assets/food/appetizerC.webp'
import appetizerD from '../../assets/food/appetizerD.webp'
import appetizerE from '../../assets/food/appetizerE.webp'
import appetizerF from '../../assets/food/appetizerF.webp'
import appetizerG from '../../assets/food/appetizerG.webp'
import appetizerH from '../../assets/food/appetizerH.webp'
import appetizerI from '../../assets/food/appetizerI.webp'
import appetizerJ from '../../assets/food/appetizerJ.webp'
import dessertA from '../../assets/food/dessertA.webp'
import dessertB from '../../assets/food/dessertB.webp'
import dessertC from '../../assets/food/dessertC.webp'
import dessertD from '../../assets/food/dessertD.webp'
import drinkA from '../../assets/food/drinkA.webp'
import drinkB from '../../assets/food/drinkB.webp'
import drinkC from '../../assets/food/drinkC.webp'
import drinkD from '../../assets/food/drinkD.webp'
import drinkE from '../../assets/food/drinkE.webp'

import { IoMdArrowDropdownCircle,IoMdArrowDropupCircle } from "react-icons/io";
import { TiArrowSortedUp,TiArrowSortedDown } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/shoppingSlice";
import classNames from "classnames";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function TakeOut() {
  const [mainDishList, setMainDishList] = useState([
  { id:'pastaA',name: "狼嚎辣肉醬麵", info: "牛豬混合絞肉,特製辣番茄醬", pic: pastaA, price: 320, count: 0 },
  { id:'pastaB',name: "火吻碳烤雞肉義大利麵", info: "炭烤雞胸,煙燻甜椒,奶油蒜香醬", pic: pastaB, price: 300, count: 0 },
  { id:'pastaC',name: "荒野蒜香培根麵", info: "厚切培根,蒜片", pic: pastaC, price: 280, count: 0 },
  { id:'pastaD',name: "黑夜墨魚獵人麵", info: "墨魚汁,花枝圈,黑蒜末", pic: pastaD, price: 350, count: 0 },
  { id:'pastaE',name: "烈焰牛排奶油寬扁麵", info: "炙燒牛排,白酒奶油醬", pic: pastaE, price: 420, count: 0 },
  { id:'pastaF',name: "月光蕈菇松露白醬麵",info:"綜合蕈菇,松露油,白醬", pic: pastaF,price:360, count: 0},
  { id:'pastaG',name: "血色番茄獵人麵",info:"牛蕃茄,雞肉丸", pic: pastaG,price:300, count: 0},
  { id:'pastaH',name: "狼群炙燒香腸辣麵",info:"義式辣味香腸,紅椒粉", pic: pastaH,price:310, count: 0},
  { id:'pastaI',name: "野莓鴨胸紅酒筆管麵",info:"煙燻鴨胸,紅酒醬,藍莓", pic: pastaI,price:390, count: 0},
  { id:'pastaJ',name: "煙燻鮭魚野林青醬麵 ",info:"煙燻鮭魚,自製青醬,櫛瓜片", pic: pastaJ,price:330, count: 0},
]);
  const [appetizerList, setAppetizerList] = useState([
  { id:'appetizerA',name:"狼牙洋蔥圈塔",info:"洋蔥圈,起司醬", pic: appetizerA, price: 160, count: 0 },
  { id:'appetizerB',name:"火山熔岩起司球",info:"切達起司,馬鈴薯泥", pic: appetizerB, price: 180, count: 0 },
  { id:'appetizerC',name:"焦土香料雞翅",info:"雞翅,炭燒辣醬,孜然", pic: appetizerC, price: 220, count: 0 },
  { id:'appetizerD',name:"野狼抓痕薯條拼盤",info:"帶皮薯條,辣粉,起司醬,蒜味醬", pic: appetizerD, price: 180, count: 0 },
  { id:'appetizerE',name:"炭烤菇菇獵人串 ",info:"香菇,杏鮑菇,紅椒", pic: appetizerE, price: 150, count: 0 },
  { id:'appetizerF',name:"深林香料炸花枝",info:"花枝圈,檸檬角", pic: appetizerF,price:240, count: 0},
  { id:'appetizerG',name:"熾燒辣味雞柳條",info:"去骨雞胸,辣椒粉,塔塔醬", pic: appetizerG,price:190, count: 0},
  { id:'appetizerH',name:"迷途羔羊炸乳酪條",info:"莫札瑞拉起司,羅勒醬", pic: appetizerH,price:170, count: 0},
  { id:'appetizerI',name:"炙焰火腿煙燻拼盤",info:"煙燻火腿,臘腸,風乾肉,橄欖", pic: appetizerI,price:240, count: 0},
  { id:'appetizerJ',name:"烈焰辣味義式肉丸 ",info:"牛豬絞肉,辣番茄醬,帕瑪森", pic: appetizerJ,price:200, count: 0},
]);
  const [dessertList, setDessertList] = useState([
  { id:'dessertA',name:"焦土熔岩巧克力蛋糕",info:"苦甜巧克力,可可粉,熔岩醬", pic: dessertA, price: 160, count: 0 },
  { id:'dessertB',name:"月影烤棉花糖布朗尼",info:"布朗尼蛋糕,烤棉花糖,堅果碎", pic: dessertB, price: 150, count: 0 },
  { id:'dessertC',name:"森林野莓奶酪",info:"藍莓,蔓越莓,香草奶酪", pic: dessertC, price: 140, count: 0 },
  { id:'dessertD',name:"炙焰香蕉冰淇淋盅",info:"炙燒香蕉,香草冰淇淋,朗姆酒", pic: dessertD, price: 180, count: 0 },
]);
  const [drinkList, setDrinkList] = useState([
  { id:'drinkA',name:"狼煙莓果氣泡飲",info:"藍莓,黑醋栗,氣泡水", pic: drinkA, price: 120, count: 0 },
  { id:'drinkB',name:"野性熱紅酒香料茶",info:"紅酒,肉桂,丁香,柳橙皮", pic: drinkB, price: 160, count: 0 },
  { id:'drinkC',name:"月下奶酒拿鐵",info:"咖啡,奶酒,肉豆蔻粉", pic: drinkC, price: 160, count: 0 },
  { id:'drinkD',name:"炭火黑糖冷萃咖啡",info:"冷萃咖啡,黑糖漿,奶霜", pic: drinkD, price: 140, count: 0 },
  { id:'drinkE',name:"血月石榴冰沙",info:"石榴汁,檸檬汁", pic: drinkE, price: 130, count: 0 },
]);
  const mainRef = useRef<HTMLDivElement>(null);
  const appetizerRef = useRef<HTMLDivElement>(null);
  const dessertRef = useRef<HTMLDivElement>(null);
  const drinkRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<string>("");
  const [isSwitch, setIsSwitch] = useState<boolean>(false);

  const sections = [
    { id: "main", ref: mainRef },
    { id: "appetizer", ref: appetizerRef },
    { id: "dessert", ref: dessertRef },
    { id: "drink", ref: drinkRef },
  ];

  const scrollTo = (ref: any, offset: number) => {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };
  useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 180;
    let current = "";

    sections.forEach((s) => {
      if (s.ref.current) {
        const offsetTop = s.ref.current.offsetTop;
        if (scrollPosition >= offsetTop) {
          current = s.id;
        }
      }
    });

    if (current) setActive(current);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [sections]);

  const dispatch =useDispatch()
  const navigate = useNavigate()
  const handleAddCart = (product:any) =>{
    if(product.count < 1) return
    dispatch(addProduct(product))
    toast.success("已加入購物車")
  }
  const handleAddAllToCart = () => {
    const allProducts = [
      ...mainDishList,
      ...appetizerList,
      ...dessertList,
      ...drinkList
    ];
  
    allProducts
      .filter(item => item.count > 0)
      .forEach(item => dispatch(addProduct(item)));
    toast.success("已全部加入購物車")
  };
  const handleChangeCount = (list:number,id:string, delta:number) => {
    if(list===1){
      setMainDishList(prev =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
      )
    );
    }else if(list===2){
      setAppetizerList(prev =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
      )
    );  
    }else if(list===3){
      setDessertList(prev =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
      )
    );  
    }else if(list===4){
      setDrinkList(prev =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
      )
    );  
    }
  };
  return (
    <div className={style.wrapper}>
      {!isSwitch && <div className={style.switch} onClick={()=>setIsSwitch(true)}><TiArrowSortedUp/></div>}
      {isSwitch && <div className={style.switch} onClick={()=>setIsSwitch(false)}><TiArrowSortedDown/></div>}
      <div className={classNames(style.navBox,isSwitch && style.hide)}>
        <div className={classNames(style.nav,active==='main' && style.active)} onClick={() => scrollTo(mainRef,180)}>主食</div>
        <div className={classNames(style.nav,active === "appetizer" && style.active)} onClick={() => scrollTo(appetizerRef,180)}>開胃菜</div>
        <div className={classNames(style.nav,active === "dessert" && style.active)} onClick={() => scrollTo(dessertRef,180)}>甜點</div>
        <div className={classNames(style.nav,active === "drink" && style.active)} onClick={() => scrollTo(drinkRef,180)}>飲品</div>
      </div>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.title} ref={mainRef}>主食</motion.div>
      <div className={style.container}>
        {mainDishList.map((item)=>
        <div key={item.id} className={style.itemBox}>
          <div className={style.itemPic}><img src={item.pic} loading="lazy"/></div>
          <div className={style.itemName}>{item.name}</div>
          <div className={style.itemInfo}>{item.info}</div>
          <div className={style.itemPrice}>$ {item.price}</div>
          <div className={style.itemCount}>
            <div className={style.count} onClick={()=>handleChangeCount(1,item.id,-1)}><IoMdArrowDropdownCircle/></div>
            <div className={style.countNumber}>{item.count}</div>
            <div className={style.count} onClick={()=>handleChangeCount(1,item.id,+1)}><IoMdArrowDropupCircle/></div>
          </div>
          <div className={style.itemButton} onClick={()=>handleAddCart(item)}>加入購物車</div>
        </div>)}
      </div>
       <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.title} ref={appetizerRef}>開胃菜</motion.div>
      <div className={style.container}>
        {appetizerList.map((item)=>
        <div key={item.id} className={style.itemBox}>
          <div className={style.itemPic}><img src={item.pic} loading="lazy"/></div>
          <div className={style.itemName}>{item.name}</div>
          <div className={style.itemInfo}>{item.info}</div>
          <div className={style.itemPrice}>$ {item.price}</div>
          <div className={style.itemCount}>
            <div className={style.count} onClick={()=>handleChangeCount(2,item.id,-1)}><IoMdArrowDropdownCircle/></div>
            <div className={style.countNumber}>{item.count}</div>
            <div className={style.count} onClick={()=>handleChangeCount(2,item.id,+1)}><IoMdArrowDropupCircle/></div>
          </div>
          <div className={style.itemButton} onClick={()=>handleAddCart(item)}>加入購物車</div>
        </div>)}
      </div>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.title} ref={dessertRef}>甜點</motion.div>
      <div className={style.container}>
        {dessertList.map((item)=>
        <div key={item.id} className={style.itemBox}>
          <div className={style.itemPic}><img src={item.pic} loading="lazy"/></div>
          <div className={style.itemName}>{item.name}</div>
          <div className={style.itemInfo}>{item.info}</div>
          <div className={style.itemPrice}>$ {item.price}</div>
          <div className={style.itemCount}>
            <div className={style.count} onClick={()=>handleChangeCount(3,item.id,-1)}><IoMdArrowDropdownCircle/></div>
            <div className={style.countNumber}>{item.count}</div>
            <div className={style.count} onClick={()=>handleChangeCount(3,item.id,+1)}><IoMdArrowDropupCircle/></div>
          </div>
          <div className={style.itemButton} onClick={()=>handleAddCart(item)}>加入購物車</div>
        </div>)}
      </div>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.title} ref={drinkRef}>飲品</motion.div>
      <div className={style.container}>
        {drinkList.map((item)=>
        <div key={item.id} className={style.itemBox}>
          <div className={style.itemPic}><img src={item.pic} loading="lazy"/></div>
          <div className={style.itemName}>{item.name}</div>
          <div className={style.itemInfo}>{item.info}</div>
          <div className={style.itemPrice}>$ {item.price}</div>
          <div className={style.itemCount}>
            <div className={style.count} onClick={()=>handleChangeCount(4,item.id,-1)}><IoMdArrowDropdownCircle/></div>
            <div className={style.countNumber}>{item.count}</div>
            <div className={style.count} onClick={()=>handleChangeCount(4,item.id,+1)}><IoMdArrowDropupCircle/></div>
          </div>
          <div className={style.itemButton} onClick={()=>handleAddCart(item)}>加入購物車</div>
        </div>)}
      </div>
      <div className={classNames(style.itemButton,style.addAll)} onClick={()=>handleAddAllToCart()}>全部加入</div>
      <div className={classNames(style.itemButton,style.shoppingCart)} onClick={()=>navigate('/user/shopping-cart')}>查看購物車</div>
    </div>
  );
}

export default TakeOut;
