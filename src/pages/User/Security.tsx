import axios from "../../api/axios";
import style from "./Security.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
function Security() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("請輸入完整資料");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("新密碼與確認新密碼不一致");
      return;
    }
    axios
      .post("/api/user/change-password", { oldPassword, newPassword })
      .then((response) => {
        if (response.data.code === "000") {
          setError("");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          toast.success("密碼更新成功");
        }
      })
      .catch((error) => {
        console.error("change-password failed:", error);
        setError(error.response.data.msg);
      });
  };
  return (
    <div className={style.container}>
      <div className={style.title}>變更密碼</div>
      <div className={style.inputs}>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>舊密碼:</div>
          <input
            className={style.input}
            type="password"
            value={oldPassword}
            placeholder="請輸入舊密碼"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>新密碼:</div>
          <input
            className={style.input}
            type="password"
            value={newPassword}
            placeholder="請輸入新密碼"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>確認密碼:</div>
          <input
            className={style.input}
            type="password"
            value={confirmPassword}
            placeholder="請再次輸入新密碼"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className={style.button} onClick={() => handleChange()}>
        確定
      </div>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
}
export default Security;
