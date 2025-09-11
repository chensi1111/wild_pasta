import classNames from "classnames";
import style from "./ForgotPassword.module.css";
import { MdOutlinePersonOutline, MdLock } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ForgotPassword() {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [verify, setVerify] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [warnMsg, setWarnMsg] = useState("");
  const [warnType, setWarnType] = useState("");
  const sendVerify = () => {
    if (!account || verifyStatus) return;
    setVerifyStatus(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    axios
      .post("/api/user/forgot-password", { account })
      .then((response) => {
        if (response.data.code === "000") {
          toast.success("驗證碼已發送至您的電子郵件");
        }
      })
      .catch((error) => {
        console.error("Error sending verification code:", error);
        setWarnMsg(error.response.data.msg);
        if( error.response.data.code === "004"|| error.response.data.code === "001"){
          setWarnType("account");
        }else{
          setWarnType("verify");
        }
      });
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setVerifyStatus(false);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const handleVerify = () => {
    if (!account  || !verify) return;
    axios
      .post("/api/user/verify-forgot-password", {
        account,
        code:verify,
      })
      .then((response) => {
        if (response.data.code === "000") {
          toast.success("驗證成功");
          navigate(`/reset-password?token=${response.data.data.resetToken}`);
        }
      })
      .catch((error) => {
        console.error("Error during verification:", error);
        setWarnMsg(error.response.data.msg);
        if( error.response.data.code === "004"|| error.response.data.code === "001"){
          setWarnType("account");
        }else{
          setWarnType("verify");
        }
      });
  };
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={classNames(style.wrapper)}>
      <div className={classNames(style.container)}>
        <div className={classNames(style.title)}>忘記密碼</div>
        <div className={classNames(style.inputContainer)}>
          <div className={classNames(style.inputTitle)}>帳號</div>
          <div className={classNames(style.inputBox)}>
            <div className={classNames(style.icon)}>
              <MdOutlinePersonOutline />
            </div>
            <input
              className={classNames(
                style.input,
                warnType == "account" && style.wrong
              )}
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="請輸入帳號"
            />
          </div>
        </div>
        <div className={classNames(style.inputContainer)}>
          <div className={classNames(style.inputTitle)}>驗證碼</div>
          <div className={classNames(style.inputBox)}>
            <div className={classNames(style.icon)}>
              <MdLock />
            </div>
            <input
              className={classNames(
                style.input,
                warnType == "verify" && style.wrong
              )}
              type="text"
              value={verify}
              onChange={(e) => setVerify(e.target.value)}
              placeholder="請輸入驗證碼"
            />
            {!verifyStatus && (
              <div className={style.verifyButton} onClick={() => sendVerify()}>
                獲取驗證碼
              </div>
            )}
            {verifyStatus && (
              <div
                className={style.verifyButtonDisable}
                onClick={() => sendVerify()}
              >
                重新獲取 {countdown}
              </div>
            )}
          </div>
        </div>
        <div className={classNames(style.warn)}>{warnMsg}</div>
        <div
          className={classNames(
            style.button,
            account.length && verify.length && style.access
          )}
          onClick={() => handleVerify()}
        >
          確認
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
