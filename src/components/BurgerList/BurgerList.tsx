import style from "./BurgerList.module.css";
import type { RootState } from "../../store/store.ts";
import { closeBurger } from "../../store/burgerSlice.ts";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useWindowSize } from "../../hooks/useWindowSize";
function BurgerList() {
  const burgerStore = useSelector((state: RootState) => state.burger);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (path: string) => {
    dispatch(closeBurger());
    navigate(path);
  };
  return (
    width < 1024 && (
      <div
        className={classNames(
          style.container,
          burgerStore.open && style.activate
        )}
      >
        <div className={style.nav} onClick={() => handleClick("/")}>
          首頁
        </div>
        <div className={style.nav} onClick={() => handleClick("/about")}>
          關於Wild
        </div>
        <div className={style.nav} onClick={() => handleClick("/menu")}>
          野性菜單
        </div>
        <div className={style.nav} onClick={() => handleClick("/reserve")}>
          立即訂位
        </div>
        <div className={style.nav} onClick={() => handleClick("/take-out")}>
          我要外帶
        </div>
        <div className={style.nav} onClick={() => handleClick("/contact")}>
          聯絡我們
        </div>
      </div>
    )
  );
}

export default BurgerList;
