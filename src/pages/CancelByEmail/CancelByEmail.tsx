import style from "./CancelByEmail.module.css";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
function CancelByEmail() {
  const navigate = useNavigate()
  const [msg, setMsg] = useState("");
  const [ordNumber, setOrdNumber] = useState("");
  const [status, setStatus] = useState("");
  const [countDown, setCountDown] = useState(0);
  const cancel_TKOToken = new URLSearchParams(location.search).get("TKOToken");
  const cancel_ORDToken = new URLSearchParams(location.search).get("ORDToken");
  const cancelTakeOut = () => {
    if(!cancel_TKOToken) return
    axios
      .post("/api/takeout/cancel-email", {
        cancel_token:cancel_TKOToken,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code == "000") {
          setOrdNumber(response.data.data.ord_number);
          setMsg(response.data.msg);
          setStatus("success");
          setCountDown(5);
        }
      })
      .catch((error) => {
        setOrdNumber(error.response.data.data.ord_number);
        setMsg(error.response.data.msg);
        setStatus("fail");
      });
  };
  const cancelOrder = () => {
    if(!cancel_ORDToken) return
    axios
      .post("/api/reserve/cancel-email", {
        cancel_token:cancel_ORDToken,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code == "000") {
          setOrdNumber(response.data.data.ord_number);
          setMsg(response.data.msg);
          setStatus("success");
          setCountDown(5);
        }
      })
      .catch((error) => {
        setOrdNumber(error.response.data.data.ord_number);
        setMsg(error.response.data.msg);
        setStatus("fail");
      });
  };
    useEffect(()=>{
      cancelTakeOut()
      cancelOrder()
    },[])
  useEffect(() => {
    if (countDown <= 0) return;
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countDown]);
  return (
    msg && (
      <div className={style.container}>
        {ordNumber && <div className={style.number}>訂單 : {ordNumber}</div>}
        <div
          className={classNames(style.status, status === "fail" && style.fail)}
        >
          {msg}
        </div>
        {countDown > 0 &&<div className={style.countDown}>{countDown}秒後跳轉</div>}
      </div>
    )
  );
}

export default CancelByEmail;
