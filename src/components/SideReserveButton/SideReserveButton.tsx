import style from "./SideReserveButton.module.css";
import { MdRestaurantMenu } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useWindowSize } from '../../hooks/useWindowSize';
function SideReserveButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const hiddenPaths = ["/login", "/register", "/user","/forgot-password","/reset-password","/reserve"];
  const toReserve = () => {
    navigate("/reserve");
  };
  const memberStore = useSelector((state: RootState) => state.member);
  const burgerStore = useSelector((state: RootState) => state.burger);
  const {width} =useWindowSize()
  return (
    <>
      {!hiddenPaths.some((path) => location.pathname.startsWith(path)) && (
        <div>
          {width >=1024 && <div
            className={classNames(
              style.container,
              memberStore.open && style.activate,
              burgerStore.open && style.activate
            )}
          >
            <MdRestaurantMenu size={35} color="rgb(255, 187, 0)" />
            <div onClick={() => toReserve()} className={style.content}>
              立即訂位
            </div>
          </div>}
          {width < 1024 && <div className={style.footer}>
            <MdRestaurantMenu size={35} color="rgb(255, 187, 0)" />
            <div onClick={() => toReserve()} className={style.footerContent}>
              立即訂位
            </div>
          </div>}
        </div>
      )}
    </>
  );
}

export default SideReserveButton;
