import axios from '../../api/axios'
import { useEffect,useState } from 'react';
import style from './Point.module.css';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import type { RootState } from "../../store/store.ts";
import Pagination from '@mui/material/Pagination';
import { FaAward,FaPlus,FaMinus } from "react-icons/fa";
function Point() {
    const [pointData,setPointData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const userStore = useSelector((state: RootState) => state.member);
    const point = userStore.userInfo.point
    const getPoint = () => {
      setLoading(true)
      axios
      .post("/api/user/points",{page: page, pageSize: 5})
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
            setPointData(response.data.data.rows);
            setTotalPages(response.data.data.totalPages);
        }
      })
      .catch((error) => {
        console.error("get point failed:", error);
      })
      .finally(()=>{
        setLoading(false)
      });
    }
    const formatDate = (dateString: string) => {
      return dayjs(dateString).format('YYYY/MM/DD');
    };
    const formatTime = (dateString: string) => {
      return dayjs(dateString).format('HH:mm:ss');
    };
    const getStatus = (status: string) => {
        if( status === "earn") {
            return "新增訂單";
        }else if(status === "cancel") {
            return "取消訂單";
        }else if(status === "use") {
            return "使用點數";
        }else if(status === "adminPlus"){
            return "管理員新增";
        }else if(status === "adminMinus"){
            return "管理員刪除";
        }
    }
    const pointStyle = (point:number,status:string) => {
        if( status === "earn") {
            return `+${point} P`;
        }else if(status === "cancel") {
            return `-${point} P`;
        }else if(status === "use") {
            return `-${point} P`;
        }else if(status === "adminPlus") {
            return `${point} P`;
        }else if(status === "adminMinus") {
            return `${point} P`;
        }
    }
    useEffect(() => {
        getPoint()
    }, [page])
    return <div className={style.container}>
        <div className={style.title}>會員點數</div>
        <div className={style.describe}>每消費100元可以獲得3 P，1 P可以折抵1元</div>
        <div className={style.point}>
          <div className={style.points}>
            <div className={style.pointTitle}>目前點數</div>
            <div className={style.pointValue}>{point} P</div>
          </div>
          <div className={style.icon}><FaAward/></div>
        </div>
        <div className={style.title}>點數記錄</div>
        {!loading && pointData.map((item:any)=>(<div className={style.pointsContainer}>
          <div className={style.leftContainer}>
            {(item.action === 'earn' || item.action === 'adminPlus') && <div className={style.plusIcon}><FaPlus/></div>}
            {(item.action !== 'earn' && item.action !== 'adminPlus') && <div className={style.minusIcon}><FaMinus/></div>}
            <div className={style.pointType}>
              <div className={style.pointTypeTitle}>{getStatus(item.action)}</div>
              <div className={style.pointTypeValue}>{item.ord_number}</div>
            </div>
          </div>
          <div className={style.rightContainer}>
            <div className={style.pointType}>
              <div className={classNames(style.pointTypeNumber,(item.action !== 'earn' && item.action !== 'adminPlus')  && style.minus)}>{pointStyle(item.point,item.action)}</div>
              <div className={style.pointTypeValue}>{formatDate(item.create_time)}</div>
              <div className={style.pointTypeValue}>{formatTime(item.create_time)}</div>
            </div>
          </div>
        </div>))}
        {loading && <div className={style.loadingContainer}><div className={style.loading}>載入中...</div></div>}
        {!loading && pointData.length === 0 && <div className={style.loadingContainer}>目前沒有點數記錄</div>}
        {pointData.length !== 0 && <div className={style.pagination}>
            <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} siblingCount={0} boundaryCount={1} sx={{ul: {whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}}/>
        </div>}
    </div>
}
export default Point;