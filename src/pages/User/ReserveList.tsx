import style from "./ReserveList.module.css";
import classNames from "classnames";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios.ts";
import Pagination from '@mui/material/Pagination';
import { ConfirmDialog } from "../../components/ConfirmDialog/confirmDialog.tsx";
import { MdOutlineLocalPhone,MdOutlineEmail,MdAccessTime,MdOutlineCalendarMonth  } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import dayjs from 'dayjs';
const themeMap: { [key: string]: string } = {
    "birthday": "生日聚餐",
    "anniversary": "紀念日聚餐",
    "family": "家庭聚餐",
    "friends": "朋友聚餐",
    "business": "商務聚餐",
    "date": "約會聚餐"
}

type ReservationDetail = {
  ord_number: string;
  ord_time: string;
  name: string;
  date: string;
  time: string;
  people: number;
  theme: string;
  food_allergy: string;
  remark: string;
  phone_number: string;
  email: string;
};
type TakeOut = {
  ord_number: string;
  ord_time: string;
  name: string;
  date: string;
  end_time: string;
  list: string;
  price:number;
  discount:number;
  point:number;
  remark: string;
  phone_number: string;
  email: string;
}
function ReserveList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "reservation";
  const [activeTab, setActiveTab] = useState(type);
  const [reservationData, setReservationData] = useState<ReservationDetail[]>([]);
  const [takeOutData, setTakeOutData] = useState<TakeOut[]>([]);
  const [reservationDetail, setReservationDetail] = useState<ReservationDetail|null>(null);
  const [takeOutDetail, setTakeOutDetail] = useState<TakeOut|null>(null);
  const [foodList,setFoodList] = useState<any>()
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelOrdNumber, setCancelOrdNumber] = useState<string>("");
  const [cancelType, setCancelTpye] = useState(0)
  const [loading, setLoading] = useState(false)
 
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

  // 訂位訂單
  const handleGetReservations = (page:number) => {
    setActiveTab("reservation");
    setLoading(true)
    axios
      .post("/api/user/reserve", { page, pageSize: 5 })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
          setReservationData(response.data.data.rows);
          setPage(response.data.data.page);
          setTotalPages(response.data.data.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
   // 外帶訂單
  const handleGetTakeOut = (page:number) => {
    setActiveTab("takeOut");
    setLoading(true)
    axios
      .post("/api/user/takeout",{page, pageSize: 5})
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
          setTakeOutData(response.data.data.rows);
          setPage(response.data.data.page);
          setTotalPages(response.data.data.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      })
      .finally(()=>{
        setLoading(false)
      });
  };
  const showDetail = (item:any,type:number) =>{
    if(type===0){
      setReservationDetail(item)
    }else{
      setTakeOutDetail(item)
      setFoodList(getProductList(item.list))
    }
  }
const formatDate = (dateString: string) => {
  return dayjs(dateString).format('YYYY/MM/DD HH:mm:ss');
};

const formatOnlyDate = (dateString:string, format = 'YYYY-MM-DD') => {
  return dayjs(dateString).format(format);
}
const handleCancel = (event: React.MouseEvent<any>, ord_number: string,type:number,) => {
  event.stopPropagation();
  setCancelTpye(type)
  setConfirmOpen(true);
  setCancelOrdNumber(ord_number);
}
const confirmCancel = () =>{
  if(cancelType===0){
    cancelReserveOrd(cancelOrdNumber)
  }else{
    cancelTakeOutOrd(cancelOrdNumber)
  }
}
// 取消訂位
const cancelReserveOrd = (ord_number: string) => {
  console.log('取消訂單:', ord_number);
  axios.post('/api/reserve/cancel', { ord_number })
  .then(response => {
    console.log(response.data);
    if (response.data.code === '000') {
      console.log('取消成功');
      // 判斷刪除後是否當前頁沒有資料
      const updatedData = reservationData.filter(item => item.ord_number !== ord_number);
      console.log('更新後的資料:', updatedData);
      if( updatedData.length === 0 && page > 1) {
        console.log('當前頁沒有資料，切換到上一頁');
        setPage(page - 1);
      }else{
        handleGetReservations(page);
      }
    } 
  })
  .catch(error => {
    console.error('取消訂單失敗:', error);
  }).finally(() => {
    setConfirmOpen(false);
  })
};
// 取消外帶
const cancelTakeOutOrd = (ord_number: string) => {
  console.log('取消外帶:', ord_number);
  axios.post('/api/takeout/cancel', { ord_number })
  .then(response => {
    console.log(response.data);
    if (response.data.code === '000') {
      console.log('取消成功');
      // 判斷刪除後是否當前頁沒有資料
      const updatedData = takeOutData.filter(item => item.ord_number !== ord_number);
      console.log('更新後的資料:', updatedData);
      if( updatedData.length === 0 && page > 1) {
        console.log('當前頁沒有資料，切換到上一頁');
        setPage(page - 1);
      }else{
        handleGetTakeOut(page);
      }
    } 
  })
  .catch(error => {
    console.error('取消訂單失敗:', error);
  }).finally(() => {
    setConfirmOpen(false);
  })
};
const getOrderStatus=(date:string,time:string): string=> {
  const now = dayjs();
  const orderTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
  const endTime = orderTime.add(90, 'minute');

  if (now < orderTime) {
    return "訂位成功";
  } else if (now >= orderTime && now <= endTime) {
    return "進行中";
  } else {
    return "已完成";
  }
}
const cancelAvailable=(date:string,time:string,limit:number): boolean=> {
  const now = dayjs();
  const orderTime = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
  const cancelTime = orderTime.add(limit, 'minute');
  if(now<cancelTime){
    return true
  }else{
    return false
  }
}
  useEffect(() => {
    if(activeTab==="reservation"){
      handleGetReservations(page);
    }else{
      handleGetTakeOut(page)
    }
  }, [page]);
  return (
    <div className={style.wrapper}>
      <ConfirmDialog
          open={confirmOpen}
          title="警告"
          message={`是否要取消單號 ${cancelOrdNumber} ?`}
          onConfirm={() => confirmCancel()}
          onCancel={() => setConfirmOpen(false)}
          onExited={() => setCancelOrdNumber("")}
          >
      </ConfirmDialog>
      <div className={style.container}>
        <div className={style.title}>訂單管理</div>
        <div className={style.navs}>
          <div
            className={classNames(
              style.nav,
              activeTab === "reservation" && style.active
            )}
            onClick={() => handleGetReservations(1)}
          >
            預約訂位
          </div>
          <div
            className={classNames(
              style.nav,
              activeTab === "takeOut" && style.active
            )}
            onClick={() => handleGetTakeOut(1)}
          >
            外帶訂單
          </div>
        </div>
        {activeTab === "reservation" && <div className={style.notice}>注意:預約時間前30分鐘無法取消</div>}
        {activeTab === "takeOut" && <div className={style.notice}>注意:取餐時間前90分鐘無法取消</div>}
        <div className={style.orderContainer}>
          {!loading && activeTab === "reservation" && reservationData.map((item: any) => (
            <div key={item.ord_number} className={style.reservationLists} onClick={()=>showDetail(item,0)}>
              <div className={style.leftContainer}>
                <div className={style.leftTitle}><span><RiFileList3Line/></span>{item.ord_number}</div>
                <div className={style.leftInfo}>訂單時間 : {formatDate(item.ord_time)}</div>
                <div className={style.leftInfo}>預約日期 : {formatOnlyDate(item.date)}</div>
                <div className={style.leftInfo}>預約時間 : {(item.time).slice(0,5)}</div>
              </div>
              <div className={style.rightContainer}>
                {cancelAvailable(formatOnlyDate(item.date),item.time.slice(0, 5),-30) && <div className={style.cancel} onClick={(e)=>handleCancel(e,item.ord_number,0)}>X 取消</div>}
                {!cancelAvailable(formatOnlyDate(item.date),item.time.slice(0, 5),-30) && <div className={style.cancel}></div>}
              </div>
            </div>
          ))}
          {!loading && activeTab === "takeOut" && takeOutData.map((item: any) => (
            <div key={item.ord_number} className={style.reservationLists} onClick={()=>showDetail(item,1)}>
              <div className={style.leftContainer}>
                <div className={style.leftTitle}><span><RiFileList3Line/></span>{item.ord_number}</div>
                <div className={style.leftInfo}>訂單時間 : {formatDate(item.ord_time)}</div>
                <div className={style.leftInfo}>取餐日期 : {formatOnlyDate(item.date)}</div>
                <div className={style.leftInfo}>取餐時間 : {item.end_time.slice(0, 5)}</div>
              </div>
              <div className={style.rightContainer}>
                {cancelAvailable(formatOnlyDate(item.date),item.end_time.slice(0, 5),-90) && <div className={style.cancel} onClick={(e)=>handleCancel(e,item.ord_number,1)}>X</div>}
                {!cancelAvailable(formatOnlyDate(item.date),item.end_time.slice(0, 5),-90) && <div className={style.cancel}></div>}
              </div>
            </div>
          ))}
          {loading && 
          <div className={style.loadingContainer}>
            <div className={style.loading}>載入中...</div>
          </div>}
          {((activeTab === "takeOut" && !loading && takeOutData.length === 0) ||(activeTab === "reservation" && !loading && reservationData.length === 0)) &&
          <div className={style.loadingContainer}>
            <div className={style.empty}>目前沒有資料</div>
          </div>}
          {((activeTab === "takeOut" && takeOutData.length !== 0) ||(activeTab === "reservation" && reservationData.length !== 0)) && <div className={style.pagination}>
            <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} siblingCount={0} boundaryCount={1} sx={{ul: {whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}}/>
          </div>}
        </div>
        {reservationDetail &&
        <div className={style.transparentBox} onClick={()=>setReservationDetail(null)}>
          <div className={style.orderDetail} onClick={(e) => e.stopPropagation()}>
            <div className={style.detailTitle}>訂單詳情</div>
            <div className={style.detailInfo}><span>訂單編號 :</span>{reservationDetail.ord_number}</div>
            <div className={style.detailInfo}><span>訂單時間 :</span>{formatDate(reservationDetail.ord_time)}</div>
            <div className={style.detailInfo}><span>訂位日期 :</span>{formatOnlyDate(reservationDetail.date)}</div>
            <div className={style.detailInfo}><span>訂位時間 :</span>{(reservationDetail.time).slice(0,5)}</div>
            <div className={style.detailInfo}><span>訂位姓名 :</span>{reservationDetail.name}</div>
            <div className={style.detailInfo}><span>訂位人數 :</span>{reservationDetail.people}</div>
            <div className={style.detailInfo}><span>主題 :</span>{themeMap[reservationDetail.theme]}</div>
            <div className={style.detailInfo}><span>連絡電話 :</span>{reservationDetail.phone_number}</div>
            <div className={style.detailInfo}><span>Email :</span>{reservationDetail.email}</div>
            {reservationDetail.food_allergy && <div className={style.remarks}>
                <div className={style.detailInfo}>過敏食物 : </div>
                <div className={style.remark}>{reservationDetail.food_allergy} </div>
            </div>
            }
            {reservationDetail.remark && <div className={style.remarks}>
                <div className={style.detailInfo}>備註 : </div>
                <div className={style.remark}>{reservationDetail.remark} </div>
            </div>}
            <div className={style.detailInfo}><span>訂單狀態 :</span><div>{getOrderStatus(formatOnlyDate(reservationDetail.date),(reservationDetail.time).slice(0,5))}</div></div>
            <div className={style.close} onClick={()=>setReservationDetail(null)}>關 閉</div>
        </div>
        </div>
         }
        {takeOutDetail &&
        <div className={style.transparentBox} onClick={()=>setTakeOutDetail(null)}>
          <div className={style.orderDetail} onClick={(e) => e.stopPropagation()}>
            <div className={style.detailTitle}>訂單詳情</div>
            <div className={style.detailInfo}>
              <div className={style.infoTitle}>訂單編號 :</div>
              <span>{takeOutDetail.ord_number}</span>
            </div>
            <div className={style.detailInfo}>
              <div className={style.infoTitle}>訂單時間 :</div>
              <span>{formatDate(takeOutDetail.ord_time)}</span>
            </div>
            <div className={style.detailInfo}>
              <div className={style.infoTitle}>取餐日期 :</div>
              <span><MdOutlineCalendarMonth/>{formatOnlyDate(takeOutDetail.date)}</span>
            </div>
            <div className={style.detailInfo}>
              <div className={style.infoTitle}>取餐時間 :</div>
              <span><MdAccessTime/>{(takeOutDetail.end_time).slice(0,5)}</span>
            </div>
            <div className={style.detailInfo}>
              <div className={style.infoTitle}>訂購姓名 :</div>
              <span>{takeOutDetail.name}</span>
            </div>
            <div className={style.subTitle}>訂購餐點 : </div>
            <div className={style.foods}>
              {foodList.map((item:any) => (
                <li key={item.code} className={style.food}>
                  <span className={style.foodName}>{item.name}</span>
                  <span className={style.foodQty}> × {item.qty}</span>
                </li>
                ))}
            </div>
            {takeOutDetail.remark && <div className={style.remarks}>
                <div className={style.subTitle}>備註 : </div>
                <div className={style.remark}>{takeOutDetail.remark}</div>
            </div>}
            {takeOutDetail.discount!=0 && <div className={style.detailInfo}>
              <div className={style.infoTitle}>小計 :</div>
              <span>$ {takeOutDetail.price}</span>
            </div>}
            {takeOutDetail.discount!=0 && <div className={style.detailInfo}>
              <div className={style.infoTitle}>點數折扣 :</div>
              <span>$ {takeOutDetail.discount}</span>
            </div>}
            <div className={classNames(style.detailInfo,style.total)}>
              <div className={style.infoTitle}>總計 :</div>
              <span>$ {(takeOutDetail.price - takeOutDetail.discount)}</span>
            </div>
            <div className={classNames(style.detailInfo,style.point)}>
              <div className={style.infoTitle}>累積點數 :</div>
              <span>{takeOutDetail.point} P</span>
            </div>
            <div className={style.contact}><MdOutlineLocalPhone/>{takeOutDetail.phone_number}</div>
            <div className={style.contact}><MdOutlineEmail/>{takeOutDetail.email}</div>
            <div className={style.close} onClick={()=>setTakeOutDetail(null)}>關 閉</div>
        </div>
        </div>
         }
      </div>
    </div>
  );
}

export default ReserveList;
