import style from "./Footer.module.css";
import facebook from '../../assets/facebook.webp'
import youtube from '../../assets/youtube.webp'
import instagram from '../../assets/instagram.webp'
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate()
  return (
    <div className={style.container}>
      <div className={style.title}>Wild Pasta</div>
      <div className={style.infos}>
        <div className={style.contents}>
          <div className={style.content}>
            <div className={style.subTitle}>營業時間:</div>
            <div className={style.info}>11:00 ~ 22:00</div>
          </div>
          <div className={style.content}>
            <div className={style.subTitle}>訂位電話:</div>
            <a className={style.info} href="tel:0212345678">02-12345678</a>
          </div>
          <div className={style.content}>
            <div className={style.subTitle}>地址:</div>
            <a className={style.info} href="https://maps.app.goo.gl/opccVewqUCRRuFo27" target="blank">台北市信義區信義路五段7號</a>
          </div>
        </div>
        <div className={style.contacts}>
          <div className={style.subTitle}>Follow Us</div>
          <div className={style.icons}>
            <a className={style.icon} href="https://www.facebook.com/" target="blank"><img src={facebook} alt="facebook" /></a>
            <a className={style.icon} href="https://www.instagram.com/" target="blank"><img src={instagram} alt="instagram" /></a>
            <a className={style.icon} href="https://www.youtube.com/" target="blank"><img src={youtube} alt="youtube" /></a>
          </div>
        </div>
      </div>
      <div className={style.links}>
        <div className={style.link} onClick={()=>navigate("/privacy")}>隱私權政策</div>
        <div className={style.link} onClick={()=>navigate("/term")}>服務條款</div>
      </div>
    </div>
  );
}

export default Footer;
