import style from "./Basic.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../store/memberSlice";
import type { RootState } from "../../store/store";
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import classNames from "classnames";
function Basic() {
  const dispatch = useDispatch();
  const memberStore = useSelector((state: RootState) => state.member);
  const userInfo = memberStore.userInfo;
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const [phone, setPhone] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [verifys, setVerifys] = useState(Array(6).fill(""));
  const handleEdit = () => {
    setIsEdit(true);
    handleEditInput();
  };
  const handleCancel = () => {
    setIsEdit(false);
    handleEditCancel();
  };
  const handleEditInput = () => {
    setTempName(name);
    setTempPhone(phone);
    setTempEmail(email);
  };
  const handleEditCancel = () => {
    setName(tempName);
    setPhone(tempPhone);
    setEmail(tempEmail);
  };
  const handleEditEmail = (email: string) => {
    if (!checkDifferent(email, userInfo.email)) return;
    axios
      .post("/api/user/change-email-request", { email })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
          toast.info("已發送驗證信，請至Email確認");
          setShowVerify(true);
        }
      })
      .catch((error) => {
        console.error("change-email-request failed:", error);
        toast.error(error.response.data.msg);
      });
  };
  const handleEditPhone = (phone: string) => {
    if (!checkDifferent(phone, userInfo.phone)) return;
    axios
      .post("/api/user/change-phone", { phone })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
          toast.success("手機號碼更新成功");
          setTempPhone(phone);
          getUserInfo();
        }
      })
      .catch((error) => {
        console.error("change-phone failed:", error);
        toast.error(error.response.data.msg);
      });
  };
  const handleEditName = (name: string) => {
    if (!checkDifferent(name, userInfo.name)) return;
    axios
      .post("/api/user/change-name", { name })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
          toast.success("姓名更新成功");
          setTempName(name);
          getUserInfo();
        }
      })
      .catch((error) => {
        console.error("change-name failed:", error);
        toast.error(error.response.data.msg);
      });
  };
  const getUserInfo = () => {
    axios
      .post("/api/user/info")
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
          const newUserInfo = response.data.data;
          const raw = localStorage.getItem("userInfo");
          const oldUserInfo = raw ? JSON.parse(raw) : {};
          const updatedUserInfo = {
            ...oldUserInfo,
            ...newUserInfo,
          };
          dispatch(setUserInfo(updatedUserInfo));
          localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        }
      })
      .catch((error) => {
        console.error("getUserInfo failed:", error);
      });
  };
  const checkDifferent = (newValue: string, oldValue: string) => {
    if (newValue === oldValue) {
      return false;
    } else {
      return true;
    }
  };

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // 限制只能輸入數字

    const newValues = [...verifys];
    newValues[index] = value;
    setVerifys(newValues);

    // 自動跳到下一格
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !verifys[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const sendVerify = (verifys: string[]) => {
    const verifyCode = verifys.join("");
    if (verifyCode.length < 6) return;
    axios
      .post("/api/user/verify-email", { code: verifyCode, email: email })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === "000") {
          toast.success("Email變更成功");
          setTempEmail(email);
          getUserInfo();
          setShowVerify(false);
        }
      })
      .catch((error) => {
        console.error("getUserInfo failed:", error);
        toast.error(error.response.data.msg);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    if (userInfo.name) {
      setName(userInfo.name);
      setPhone(userInfo.phone);
      setEmail(userInfo.email);
    }
  }, [userInfo]);
  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.title}>基本資料</div>
        {!isEdit && (
          <div className={style.editButton} onClick={() => handleEdit()}>
            編輯
          </div>
        )}
        {isEdit && (
          <div className={style.editButton} onClick={() => handleCancel()}>
            取消
          </div>
        )}
      </div>
      <div className={style.inputs}>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>姓名:</div>
          <input
            className={style.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入姓名"
            disabled={!isEdit}
          />
          {isEdit && (
            <div
              className={classNames(
                style.edit,
                !checkDifferent(name, userInfo.name) && style.banned
              )}
              onClick={() => handleEditName(name)}
            >
              儲存
            </div>
          )}
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>手機:</div>
          <input
            className={style.input}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="請輸入手機號碼"
            disabled={!isEdit}
          />
          {isEdit && (
            <div
              className={classNames(
                style.edit,
                !checkDifferent(phone, userInfo.phone) && style.banned
              )}
              onClick={() => handleEditPhone(phone)}
            >
              儲存
            </div>
          )}
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputTitle}>信箱:</div>
          <input
            className={style.input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="請輸入信箱"
            disabled={!isEdit}
          />
          {isEdit && (
            <div
              className={classNames(
                style.edit,
                !checkDifferent(email, userInfo.email) && style.banned
              )}
              onClick={() => handleEditEmail(email)}
            >
              驗證
            </div>
          )}
        </div>
      </div>
      {showVerify && (
        <div className={style.verifyContainer}>
          <div
            className={style.verifyCancel}
            onClick={() => setShowVerify(false)}
          >
            X
          </div>
          <div className={style.verifyTitle}>請輸入驗證碼</div>
          <div className={style.verifys}>
            {verifys.map((value, index) => (
              <input
                key={index}
                ref={(el: HTMLInputElement) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <div
            className={style.verifyButton}
            onClick={() => sendVerify(verifys)}
          >
            確認
          </div>
        </div>
      )}
    </div>
  );
}
export default Basic;
