import style from "./Info.module.css";
import classNames from "classnames";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { useWindowSize } from "../../hooks/useWindowSize";

function Info() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const { width } = useWindowSize();

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>個人資訊</div>
        <div className={style.infos}>
          {width > 1024 && (
            <div className={style.sideNavs}>
              <div
                className={classNames(
                  style.sideNav,
                  activePath === "/user/info" && style.active
                )}
                onClick={() => navigate("/user/info")}
              >
                基本資料
                <MdArrowForwardIos />
              </div>
              <div
                className={classNames(
                  style.sideNav,
                  activePath === "/user/info/point" && style.active
                )}
                onClick={() => navigate("/user/info/point")}
              >
                會員點數
                <MdArrowForwardIos />
              </div>
              <div
                className={classNames(
                  style.sideNav,
                  activePath === "/user/info/security" && style.active
                )}
                onClick={() => navigate("/user/info/security")}
              >
                安全設定
                <MdArrowForwardIos />
              </div>
              <div
                className={classNames(
                  style.sideNav,
                  activePath === "/user/info/account" && style.active
                )}
                onClick={() => navigate("/user/info/account")}
              >
                帳號登入
                <MdArrowForwardIos />
              </div>
            </div>
          )}
          {width <= 1024 && <div>
            <div className={style.horizontalNavs}>
              <div className={classNames(style.horizontalNav,activePath==='/user/info' && style.active)} onClick={()=>navigate('/user/info')}>基本資料</div>
              <div className={classNames(style.horizontalNav,activePath==='/user/info/point' && style.active)} onClick={()=>navigate('/user/info/point')}>會員點數</div>
              <div className={classNames(style.horizontalNav,activePath==='/user/info/security' && style.active)} onClick={()=>navigate('/user/info/security')}>安全設定</div>
              <div className={classNames(style.horizontalNav,activePath==='/user/info/account' && style.active)} onClick={()=>navigate('/user/info/account')}>帳號登入</div>
            </div>  
          </div>}
          <div className={style.outletContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Info;
