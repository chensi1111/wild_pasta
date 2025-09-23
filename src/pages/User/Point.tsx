import axios from '../../api/axios'
import { useEffect,useState } from 'react';
import style from './Point.module.css';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import type { RootState } from "../../store/store.ts";
import Pagination from '@mui/material/Pagination';
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
      return dayjs(dateString).format('YYYY/MM/DD HH:mm:ss');
    };
    const getStatus = (status: string) => {
        if( status === "earn") {
            return "新增點數";
        }else if(status === "cancel") {
            return "取消訂單";
        }else if(status === "use") {
            return "使用點數";
        }
    }
    const pointStyle = (point:number,status:string) => {
        if( status === "earn") {
            return `+${point} P`;
        }else if(status === "cancel") {
            return `-${point} P`;
        }else if(status === "use") {
            return `-${point} P`;
        }
    }
    useEffect(() => {
        getPoint()
    }, [page])
    return <div className={style.container}>
        <div className={style.title}>會員點數</div>
        <div className={style.describe}>每消費100元可以獲得3 P，1 P可以折抵1元</div>
        <div className={style.point}>目前點數: {point} P</div>
        <div className={style.title}>點數記錄</div>
        <div className={style.pointsContainer}>
            <table className={style.table}>
              <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "12.5%" }} />
                <col style={{ width: "12.5%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>訂單時間</th>
                  <th>點數</th>
                  <th>類型</th>
                  <th>更新時間</th>
                </tr>
              </thead>
              <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <div className={style.loadingContainer}>
                      <div className={style.loading}>載入中...</div>
                    </div>
                  </td>
                </tr>
              ) : pointData.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className={style.loadingContainer}>
                      <div className={style.empty}>目前沒有資料</div>
                    </div>
                  </td>
                </tr>
              ) : (
                pointData.map((item: any) => (
                  <tr
                    key={item.id}
                    className={classNames(
                      item.action === "earn" && style.earn,
                      style.row
                    )}
                  >
                    <td>{item.ord_number}</td>
                    <td>{formatDate(item.ord_time)}</td>
                    <td>{pointStyle(item.point, item.action)}</td>
                    <td>{getStatus(item.action)}</td>
                    <td>{formatDate(item.create_time)}</td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
        </div>
        {pointData.length !== 0 && <div className={style.pagination}>
            <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} siblingCount={0} boundaryCount={1} sx={{ul: {whiteSpace: 'nowrap', display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}}/>
        </div>}
    </div>
}
export default Point;