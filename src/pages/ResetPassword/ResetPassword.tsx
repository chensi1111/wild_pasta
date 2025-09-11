import classNames from "classnames";
import style from "./ResetPassword.module.css";
import {  MdLock } from "react-icons/md";
import { useState } from "react";
import axios from "../../api/axios.ts";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { LuEye,LuEyeClosed } from "react-icons/lu";
function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [warnMsg, setWarnMsg] = useState("");
  const [warnType, setWarnType] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);
  const [confirmEyeOpen, setConfirmEyeOpen] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const toggleEyeOpen = () => {
    setEyeOpen(prev => !prev);
  };
  const toggleConfirmEyeOpen = () => {
    setConfirmEyeOpen(prev => !prev);
  };
  const handleReset = () => {
    if (!password || !passwordConfirm) return;
    if (password !== passwordConfirm) {
      setWarnMsg("密碼與確認密碼不符");
      setWarnType("password");
      return;
    }
    axios.post("/api/user/reset-forgot-password", {token,password})
      .then((response) => {
        if (response.data.code === "000") {
          toast.success("密碼重設成功");
          navigate('/login')
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setWarnMsg(error.response.data.msg);
        if( error.response.data.code === "003"){
        setWarnType("password");
        }else if( error.response.data.code === "018"|| error.response.data.code === "203"|| error.response.data.code === "501"){
          toast.error(error.response.data.msg);
          navigate('/forgot-password')
        }
      });
}
 
  return (
    <div className={classNames(style.wrapper)}>
      <div className={classNames(style.container)}>
        <div className={classNames(style.title)}>重設密碼</div>
        <div className={classNames(style.inputContainer)}>
          <div className={classNames(style.inputTitle)}>密碼</div>
          <div className={classNames(style.inputBox)}>
            <div className={classNames(style.icon)}>
              <MdLock />
            </div>
            <input
              className={classNames(
                style.input,
                warnType == "password" && style.wrong
              )}
              type={eyeOpen ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
            />
            {eyeOpen && <div onClick={()=>toggleEyeOpen()} className={classNames(style.eye)}><LuEye/></div>}
            {!eyeOpen && <div onClick={()=>toggleEyeOpen()} className={classNames(style.eye)}><LuEyeClosed/></div>}
          </div>
        </div>
        <div className={classNames(style.inputContainer)}>
          <div className={classNames(style.inputTitle)}>密碼確認</div>
          <div className={classNames(style.inputBox)}>
            <div className={classNames(style.icon)}>
              <MdLock />
            </div>
            <input
              className={classNames(
                style.input,
                warnType == "password" && style.wrong
              )}
              type={confirmEyeOpen ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="請再次輸入密碼"
            />
            {confirmEyeOpen && <div onClick={()=>toggleConfirmEyeOpen()} className={classNames(style.eye)}><LuEye/></div>}
            {!confirmEyeOpen && <div onClick={()=>toggleConfirmEyeOpen()} className={classNames(style.eye)}><LuEyeClosed/></div>}
          </div>
        </div>
        <div className={classNames(style.warn)}>{warnMsg}</div>
        <div
          className={classNames(
            style.button,
            password.length && passwordConfirm.length && style.access
          )}
          onClick={() => handleReset()}
        >
          確認
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
