import axios from "../../api/axios";
import style from "./Account.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserInfo, setLoginType } from "../../store/memberSlice.ts";
import { FaSpinner } from "react-icons/fa";
type account = {
  id: number;
  device_name: string;
  created_at: string;
  last_used_at: string;
  device_id: string;
  ip: string;
};

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountList, setAccountList] = useState<account[]>([]);
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("YYYY/MM/DD HH:mm:ss");
  };
  const device_id = localStorage.getItem("deviceId") || "";
  const getAccounts = () =>{
    setLoading(true)
    axios
      .post("/api/user/accounts")
      .then((response) => {
        console.log(response.data);
        if (response.data.code == "000") {
          const sorted = [...response.data.data].sort((a, b) => {
            if (a.device_id === device_id) return -1;
            if (b.device_id === device_id) return 1;
            return 0; // 其他維持原本順序
          });
          setAccountList(sorted);
        }
      })
      .catch((error) => {
        console.error("Search failed:", error);
        toast.error(error.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const handleLogOut = (account: account) => {
    if (account.device_id === device_id) {
      axios
        .post("/api/user/logout")
        .then((response) => {
          console.log(response.data);
          if (response.data.code == "000") {
            localStorage.removeItem("userInfo");
            dispatch(clearUserInfo());
            dispatch(setLoginType(false));
            navigate("/login");
            toast.success('已登出')
          }
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          toast.error(error.response.data.msg);
        });
    }else{
        axios
        .post("/api/user/kick-account", {
          deviceId: account.device_id,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == "000") {
            getAccounts()
            toast.success(`已登出 ${account.device_name}`)
          }
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          toast.error(error.response.data.msg);
        });
    }
  };
  useEffect(() => {
    getAccounts()
  }, []);
  return (
    <div className={style.container}>
      <div className={style.title}>已登入裝置</div>
      {!loading && accountList &&
        accountList.map((account) => (
          <div
            className={classNames(
              style.accounts,
              account.device_id === device_id && style.current
            )}
            key={account.id}
          >
            <div className={style.accountInfos}>
              <div className={style.accountTitle}>
                {account.device_name}
                {account.device_id === device_id && style.current && (
                  <span>當前裝置</span>
                )}
              </div>
              <div className={style.info}>
                <span>最近使用 : </span>
                {formatDate(account.last_used_at)}
              </div>
              <div className={style.info}>
                <span>登入時間 : </span>
                {formatDate(account.created_at)}
              </div>
              <div className={style.info}>
                <span>IP : </span>
                {account.ip}
              </div>
            </div>
            <div className={style.button} onClick={() => handleLogOut(account)}>
              登出
            </div>
          </div>
        ))}
      {loading && <div className={style.spinContainer}>
        <div className={style.spin}><FaSpinner/></div>
      </div>}
    </div>
  );
}
export default Account;
