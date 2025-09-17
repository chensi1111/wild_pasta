import style from "./Info.module.css";
import classNames from "classnames";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Select, MenuItem, FormControl } from "@mui/material";

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
          {width > 1200 && (
            <div className={style.sideNavs}>
              <div
                className={classNames(
                  style.sideNav,
                  activePath === "/user/info" && style.active
                )}
                onClick={() => navigate("/user/info")}
              >
                資本資料
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
          {width <= 1200 && <div className={style.selectContainer}>
            <FormControl
              fullWidth
              sx={{
                ".MuiOutlinedInput-root": {
                  height: "32px",
                  borderRadius: "5px",
                },
                ".MuiSelect-select": {
                  padding: "10px",
                },
              }}
            >
              <Select
                value={activePath}
                onChange={(e) => navigate(e.target.value)}
              >
                <MenuItem
                  value="/user/info"
                  sx={{
                    minHeight: "40px",
                    fontSize: "16px",
                    padding: "0px 15px",
                  }}
                >
                  資本資料
                </MenuItem>
                <MenuItem
                  value="/user/info/point"
                  sx={{
                    minHeight: "40px",
                    fontSize: "16px",
                    padding: "0px 15px",
                  }}
                >
                  會員點數
                </MenuItem>
                <MenuItem
                  value="/user/info/security"
                  sx={{
                    minHeight: "40px",
                    fontSize: "16px",
                    padding: "0px 15px",
                  }}
                >
                  安全設定
                </MenuItem>
                <MenuItem
                  value="/user/info/account"
                  sx={{
                    minHeight: "40px",
                    fontSize: "16px",
                    padding: "0px 15px",
                  }}
                >
                  帳號登入
                </MenuItem>
              </Select>
            </FormControl>
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
