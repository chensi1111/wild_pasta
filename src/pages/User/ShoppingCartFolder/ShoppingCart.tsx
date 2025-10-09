import style from "./ShoppingCart.module.css";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useWindowSize } from "../../../hooks/useWindowSize";

function ShoppingCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { width } = useWindowSize();

  const crumbs = [
    { label: "購物車", path: "/user/shopping-cart" },
    { label: "準備結帳", path: "/user/shopping-cart/check-out" },
    { label: "訂單完成", path: "/user/shopping-cart/complete" },
  ];
  return (
    <div className={style.wrapper}>
      <div className={style.breads}>
        <Breadcrumbs
          aria-label="breadcrumb"
           separator={
            <Typography sx={{ color: "white", fontSize: width <= 768? "16px": width <= 1024? "18px": "24px", mx: 1 }}>
              /
            </Typography>
          }
          sx={{
            fontSize:  width <= 768? "16px": width <= 1024? "18px": "24px",
          }}
        >
          {crumbs.map((crumb) => {
            const isDisabled = crumb.path === "/user/shopping-cart/complete"||crumb.path === "/user/shopping-cart/check-out";
            return (
              <Link
                key={crumb.path}
                underline={isDisabled ? "none" : "hover"}
                onClick={!isDisabled ? () => navigate(crumb.path) : undefined}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: isDisabled ? "default" : "pointer",
                  fontWeight: currentPath === crumb.path ? "bold" : "normal",
                  color: currentPath === crumb.path ? "white" : "gray",
                  pointerEvents: isDisabled ? "none" : "auto", 
                }}
              >
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
      <div className={style.container}>
        <Outlet />
      </div>
    </div>
  );
}

export default ShoppingCart;
