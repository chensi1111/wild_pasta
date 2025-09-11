import style from './Menu.module.css'
import classNames from 'classnames'
import { useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { MdArrowUpward } from "react-icons/md";

function Menu() {
  const [coverOpen, setCoverOpen] = useState(false)
  const [page1Open, setPage1Open] = useState(false)
  const [page2Open, setPage2Open] = useState(false)
  const [page3Open, setPage3Open] = useState(false)
  const {width} = useWindowSize()
  const page1 = [
    {name:"狼嚎辣肉醬麵",info:"手切牛豬混合絞肉,特製辣番茄醬",price:320},
    {name:"火吻碳烤雞肉義大利麵",info:"炭烤雞胸,煙燻甜椒,奶油蒜香醬",price:300},
    {name:"荒野蒜香培根麵",info:"厚切培根,蒜片",price:280},
    {name:"黑夜墨魚獵人麵",info:"墨魚汁,花枝圈,黑蒜末",price:350},
    {name:"烈焰牛排奶油寬扁麵",info:"炙燒牛排,白酒奶油醬",price:420}
  ]
  const page2 = [
    {name:"月光蕈菇松露白醬麵",info:"綜合蕈菇,松露油,白醬",price:360},
    {name:"血色番茄獵人麵",info:"牛蕃茄,雞肉丸",price:300},
    {name:"狼群炙燒香腸辣麵",info:"義式辣味香腸,紅椒粉",price:310},
    {name:"野莓鴨胸紅酒筆管麵",info:"煙燻鴨胸,紅酒醬,藍莓",price:390},
    {name:"煙燻鮭魚野林青醬麵 ",info:"煙燻鮭魚,自製青醬,櫛瓜片",price:330},
  ]
  const page3 = [
    {name:"狼牙洋蔥圈塔",info:"洋蔥圈,起司醬",price:160},
    {name:"火山熔岩起司球",info:"切達起司,馬鈴薯泥",price:180},
    {name:"焦土香料雞翅",info:"雞翅,炭燒辣醬,孜然",price:220},
    {name:"野狼抓痕薯條拼盤",info:"帶皮薯條,辣粉,起司醬,蒜味醬",price:180},
    {name:"炭烤菇菇獵人串 ",info:"香菇,杏鮑菇,紅椒",price:150},
  ]
  const page4 = [
    {name:"深林香料炸花枝",info:"花枝圈,檸檬角",price:240},
    {name:"熾燒辣味雞柳條",info:"去骨雞胸,辣椒粉,塔塔醬",price:190},
    {name:"迷途羔羊炸乳酪條",info:"莫札瑞拉起司,羅勒醬",price:170},
    {name:"炙焰火腿煙燻拼盤",info:"煙燻火腿,臘腸,風乾肉,橄欖",price:240},
    {name:"烈焰辣味義式肉丸 ",info:"牛豬絞肉,辣番茄醬,帕瑪森",price:200},
  ]
  const page5 = [
    {name:"焦土熔岩巧克力蛋糕",info:"苦甜巧克力,可可粉,熔岩醬",price:160},
    {name:"月影烤棉花糖布朗尼",info:"布朗尼蛋糕,烤棉花糖,堅果碎",price:150},
    {name:"森林野莓奶酪",info:"藍莓,蔓越莓,香草奶酪",price:140},
    {name:"炙焰香蕉冰淇淋盅",info:"炙燒香蕉,香草冰淇淋,朗姆酒",price:180},
  ]
  const page6 = [
    {name:"狼煙莓果氣泡飲",info:"藍莓,黑醋栗,氣泡水",price:120},
    {name:"野性熱紅酒香料茶",info:"紅酒,肉桂,丁香,柳橙皮",price:160},
    {name:"月下奶酒拿鐵",info:"咖啡,奶酒,肉豆蔻粉",price:160},
    {name:"炭火黑糖冷萃咖啡",info:"冷萃咖啡,黑糖漿,奶霜",price:140},
    {name:"血月石榴冰沙 ",info:"石榴汁,檸檬汁",price:130},
  ]

  const toggleCoverOpen = () => {
    if(page1Open||page2Open||page3Open) return
    setCoverOpen(!coverOpen)
  }
  const togglePage1Open = () => {
    setPage1Open(!page1Open)
  }
  const togglePage2Open = () => {
    setPage2Open(!page2Open)
  }
  const togglePage3Open = () => {
    setPage3Open(!page3Open)
  }

  return (
    <div className={style.wrapper}>
      {width >= 1024 && <div className={classNames(style.book, coverOpen && style.coverOpen)}>
        <div className={classNames(style.cover, coverOpen && style.coverOpen)} onClick={toggleCoverOpen}>
          <div className={classNames(style.frontCoverPage)}>Wild</div>
          <div className={classNames(style.backCoverPage)}></div>
        </div>
        <div className={classNames(style.page,style.page1, page1Open && style.pageOpen, coverOpen && style.coverOpen)} onClick={togglePage1Open}>
          <div className={classNames(style.frontPage)}>
            <div className={classNames(style.title)}>主食</div>
              {page1.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>1</div>
          </div>
          <div className={classNames(style.backPage)}>
            <div className={classNames(style.title)}>主食</div>
              {page2.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>2</div>
          </div>
        </div>
        <div className={classNames(style.page,style.page2, page2Open && style.pageOpen, coverOpen && style.coverOpen)} onClick={togglePage2Open}>
          <div className={classNames(style.frontPage)}>
            <div className={classNames(style.title)}>開胃菜</div>
              {page3.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>3</div>
          </div>
          <div className={classNames(style.backPage)}>
            <div className={classNames(style.title)}>開胃菜</div>
              {page4.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>4</div>
          </div>
        </div>
        <div className={classNames(style.page,style.page3, page3Open && style.pageOpen, coverOpen && style.coverOpen)} onClick={togglePage3Open}>
          <div className={classNames(style.frontPage)}>
            <div className={classNames(style.title)}>甜點</div>
              {page5.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>5</div>
          </div>
          <div className={classNames(style.backPage)}>
            <div className={classNames(style.title)}>飲品</div>
              {page6.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>6</div>
          </div>
        </div>
        <div className={classNames(style.backCover)}></div>
      </div>}
      {width >= 1024 && <div className={style.notice}>請點擊菜單<MdArrowUpward/></div>}
      {width < 1024 && <div>
      <div className={classNames(style.singleCover)}>
        <div className={classNames(style.frontCoverPage)}>Wild</div>
      </div>
      <div className={classNames(style.singlePage)}>
        <div className={classNames(style.title)}>主食</div>
              {page1.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>1</div>
      </div>
      <div className={classNames(style.singlePage)}>
        <div className={classNames(style.title)}>主食</div>
              {page2.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>2</div>
      </div>
      <div className={classNames(style.singlePage)}>
        <div className={classNames(style.title)}>開胃菜</div>
              {page3.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>3</div>
      </div>
      <div className={classNames(style.singlePage)}>
        <div className={classNames(style.title)}>開胃菜</div>
              {page4.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>4</div>
      </div>
      <div className={classNames(style.singlePage)}>
        <div className={classNames(style.title)}>甜點</div>
              {page5.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>5</div>
      </div>
      <div className={classNames(style.singlePage)}>
        <div className={classNames(style.title)}>飲品</div>
              {page6.map((item)=>(
                <div className={classNames(style.foodContainer)}>
                  <div className={classNames(style.firstLine)}>
                    <div className={classNames(style.name)}>{item.name}</div>
                    <div className={classNames(style.price)}>${item.price}</div>
                  </div>
                  <div className={classNames(style.info)}>{item.info}</div>
                </div>
              ))}
            <div className={classNames(style.pageNumber)}>6</div>
      </div>
      </div>
      }
    </div>
  )
}

export default Menu
