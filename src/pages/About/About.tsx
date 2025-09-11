import style from './About.module.css'
import { motion } from "framer-motion";
function About() {
    return <div className={style.container}>
      <div className={style.firstContainer}>
        <div className={style.infos}>
            <motion.div initial={{ y: "-100px", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.title}>About Wild</motion.div>
            <motion.div initial={{ scale:0.5 }} whileInView={{ scale:1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.subTitle}>來自野性、自由與探索</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>Wild，代表不被束縛、追尋本能的自由；</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 3, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>Pasta，象徵義式飲食文化的經典傳承。</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 4, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>讓大地的氣息、野性的能量與義式風味在舌尖綻放。</motion.div>
        </div>
        <div className={style.leftContainer}></div>
        <div className={style.rightContainer}></div>
      </div>
      <div className={style.secContainer}>
        <div className={style.infos}>
            <motion.div initial={{ y: "-100px", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.title}>Flame-Cooked</motion.div>
            <motion.div initial={{ scale:0.5 }} whileInView={{ scale:1 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.subTitle}>直火料理</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>堅持使用直火料理的方式，</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 2.2, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>讓每一道食材在高溫炙烤下激發出最純粹的香氣與風味。</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 2.4, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>透過火焰的直接包覆，我們保留了食材原有的鮮甜，</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 2.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>同時創造出層次豐富的焦香口感，</motion.div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 2.8, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} className={style.content}>為每一口義大利麵增添獨特靈魂。</motion.div>
        </div>
        <div className={style.leftContainer}></div>
        <div className={style.rightContainer}></div>
      </div>
    </div>
  }
  
  export default About;