import style from './Home.module.css';
import { MdExpandMore } from 'react-icons/md';
import classNames from 'classnames';
import { useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import fire from '../../assets/fireVideo.mp4'
import claw from '../../assets/claw.webp'
import pasta from '../../assets/pasta.mp4'
function Home() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isHover1,setIsHover1] = useState(false)
  const [isHover2,setIsHover2] = useState(false)
  const navigate = useNavigate()
  const handleNavigate = (path:string)=>{{
    navigate(path)
  }}

  const scrollToVideo = () => {
    const element = videoContainerRef.current;
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topOffset - 80,
        behavior: 'smooth',
      });
    }
  };
    return <div className={style.wrapper}>
      <div className={style.container}>
        <div className={classNames(style.slogan, style.first)}>IN THE FOREST OF FIRE AND FLAVOR<br/>THE WOLF FEASTS</div>
        <div className={classNames(style.slogan, style.last)}>火與風味交織的森林，野狼盛宴</div>
        <div className={style.arrow} onClick={scrollToVideo}>
          <MdExpandMore color="white"/>
        </div>
      </div>
      <div className={style.videoContainer} ref={videoContainerRef}>
        <div className={style.videoInfo}>
          <motion.div initial={{ x: "200px", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.videoTitle}>野性，從未離開</motion.div>
          <motion.div initial={{ x: "-150px", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.videoContent}>在這裡，料理不是被製造，而是被狩獵出來的。<br/>我們用雙手揉麵、用烈火烹煮，<br/>讓每一口義大利麵都保有原始的力量與風味的本能。<br/></motion.div>
          <motion.div initial={{ y: "-100px", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.videoLastWord}>這不是料理，是一場野狼的盛宴</motion.div>
        </div>
        <video src={pasta} autoPlay muted loop/>
      </div>
      <div className={style.infoContainer}>
        <motion.div initial={{ x: "200px", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.infoTitle}>Wild Origin</motion.div>
        <motion.div initial={{ x: "-150px", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.infoSubTitle}>野性本源</motion.div>
        <motion.div initial={{ y: "-100px", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0 }}  className={style.infoContent}>直火的本能 × 麵香的靈魂 × 狼的執著</motion.div>
      </div>
      <div className={style.cardsContainer}>
          <div className={classNames(style.card, style.card1)}>
            <motion.div initial={{ x: "200px", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }}  className={style.cardTitle}><span>01</span> 手工製麵的野性記憶</motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }}  className={style.cardContent}>
            在鋼鐵與機械尚未支配廚房之前，人們靠雙手與直覺，感受麵糰的濕度與張力。我們回歸這段記憶，每一條義大利麵，都揉入了野狼般的專注，與不肯妥協的靈魂。
            </motion.div>
          </div>
          <div className={classNames(style.card, style.card2)}>
            <motion.div initial={{ x: "200px", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }}  className={style.cardTitle}><span>02</span> 火烤香氣的本能召喚</motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.cardContent}>
            不靠電，不假機器，只將原木堆疊、點燃、引出溫度與煙香。這是來自荒野的烹調藝術，柴火與時間交織出的香氣，讓每一口義大利麵都帶著炙熱、焦糖與大地的記憶。
            </motion.div>
          </div>
          <div className={classNames(style.card, style.card3)}>
            <motion.div initial={{ x: "200px", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }}  className={style.cardTitle}><span>03</span> 肉食之美的深層演繹</motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }}  className={style.cardContent}>
            選用精選肉品，炙燒至完美的紋理與熟度，不只是為了飽腹，更是對肉食本能的回應。每一片牛排、每一尾蝦，都不是點綴，而是主角，與義大利麵並肩作戰的靈魂戰友。
            </motion.div>
          </div>
        </div>
      <div className={style.boxContainer}>
        <div className={style.box} onMouseEnter={() => setIsHover1(true)} onMouseLeave={() => setIsHover1(false)} onClick={()=>handleNavigate('/take-out')}>
          <div className={style.boxTitleContainer}>
            <video src={fire} loop muted autoPlay></video>
            <div className={style.boxTitle}>TakeOut</div>
          </div>
          <div className={style.boxText}>我要外帶</div>
          <div className={classNames(style.claw,isHover1 && style.show)}><img src={claw} /></div>
        </div>
        <div className={style.box} onMouseEnter={() => setIsHover2(true)} onMouseLeave={() => setIsHover2(false)} onClick={()=>handleNavigate('/reserve')}>
          <div className={style.boxTitleContainer}>
            <video src={fire} loop muted autoPlay></video>
            <div className={style.boxTitle}>Reserve</div>
          </div>
          <div className={style.boxText}>立即訂位</div>
          <div className={classNames(style.claw,isHover2 && style.show)}><img src={claw} /></div>
        </div>
      </div>
    </div>
  }
  
  export default Home;