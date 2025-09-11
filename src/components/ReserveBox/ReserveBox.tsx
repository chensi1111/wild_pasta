import style from './ReserveBox.module.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { closeBox,setInfo } from '../../store/reserveSlice';
import classNames from 'classnames';
import {  useState,useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import axios from '../../api/axios.ts';
import { useWindowSize } from '../../hooks/useWindowSize.ts';
type Theme = { id: string; name: string };
type TimeSlot = { time_slot: string; max_capacity: number; reserved: string };
type AvailabilityMap = Record<string, boolean>;

const checkMap: Record<string, string[]> = {
    '11:00': ['11:00', '11:30', '12:00'],
    '11:30': ['11:30', '12:00', '12:30'],
    '12:00': ['12:00', '12:30', '13:00'],
    '12:30': ['12:30', '13:00', '13:30'],
    '13:00': ['13:00', '13:30', '14:00'],
    '13:30': ['13:30', '14:00'],
    '14:00': ['14:00'],
    '17:00': ['17:00', '17:30', '18:00'],
    '17:30': ['17:30', '18:00', '18:30'],
    '18:00': ['18:00', '18:30', '19:00'],
    '18:30': ['18:30', '19:00', '19:30'],
    '19:00': ['19:00', '19:30', '20:00'],
    '19:30': ['19:30', '20:00'],
    '20:00': ['20:00'],
};

function ReserveBox() {
    const reserveStore = useSelector((state: RootState) => state.reserve);
    const dispatch = useDispatch();
    const {width} = useWindowSize()
    const [datePickSize,setDatePickSize] = useState({width:'100%',height:'100%',margin:'2px'})
    useEffect(()=>{
      if(width>=1024){
        setDatePickSize({width:'100%',height:'100%',margin:'2px'})
      }else if (width<1024){
        setDatePickSize({width:'250px',height:'300px',margin:'0'})
      }
      
    },[width])

    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
    const [timeSlotList, setTimeSlotList] = useState<TimeSlot[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [availabilityMap, setAvailabilityMap] = useState<AvailabilityMap>({});
    const [remark, setRemark] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [count, setCount] = useState<number>(1);
    const [warning, setWarning] = useState<boolean>(false);

    const themeList = [
        {id:'birthday', name:'生日聚餐'},
        {id:'anniversary', name:'紀念日聚餐'},
        {id:'family', name:'家庭聚餐'},
        {id:'friends', name:'朋友聚餐'},
        {id:'business', name:'商務聚餐'},
        {id:'date', name:'約會聚餐'}
    ];

    const toggleTheme = (themeId: string) => {
      setSelectedTheme((current) => {
        return current?.id === themeId ? null : themeList.find((t) => t.id === themeId) || null;
      });
    };
    function generateAvailabilityMap(timeSlotList: TimeSlot[], count: number) {
      const slotDataMap: Record<string, TimeSlot> = {};
      timeSlotList.forEach(slot => {
        slotDataMap[(slot.time_slot).slice(0,5)] = slot;
      });
    
      const availability: AvailabilityMap = {};
    
      for (const timeKey in checkMap) {
        const checkSlots = checkMap[timeKey];
        // 若有任一重疊時段容量不足，標為 false
        const isAvailable = !checkSlots.some(slot => {
          const data = slotDataMap[slot];
          if (!data) return true; 
          return data.max_capacity - Number(data.reserved) < count;
        });
        availability[timeKey] = isAvailable;
      }
      setAvailabilityMap(availability);
    }
    const toggleTime = (timeSlot: string) => {
      const targetSlot = timeSlotList.find((time) => time.time_slot === timeSlot);
      if(availabilityMap[timeSlot.slice(0,5)] === false || !targetSlot) return;
      setSelectedTime((current) => {
        return current === timeSlot ? "" : timeSlot;
      });
    };
    const incrementCount = () => {
        setCount((prevCount) => Math.min(prevCount + 1, 12)); 
        setSelectedTime("");
    }
    const decrementCount = () => {
        setCount((prevCount) => Math.max(prevCount - 1, 1));
        setSelectedTime(""); 
    }
    const handleDateChange = (newValue:Dayjs | null)=>{
        if (!newValue) return;
        setDate(newValue);
        searchTimeSlot(newValue.format('YYYY-MM-DD'));
        setSelectedTime("");
    }
    const searchTimeSlot = (date:string)=>{
        axios.post('/api/reserve/date', { date })
        .then((res) => {
            console.log(res.data);
            if (res.data.code === '000') {
            const currentDate = res.data.data.date;
            const now = dayjs(); 
            // 過濾時間：至少距離現在一小時
            const filtered = res.data.data.rows.filter((row: any) => {
              const fullTimeStr = `${currentDate}T${row.time_slot}`; // 組合成完整時間
              const slotTime = dayjs(fullTimeStr); // 解析為 dayjs 時間
              const diffInMinutes = slotTime.diff(now, 'minute');
              return diffInMinutes >= 60;
            });
    
            setTimeSlotList(filtered);
          }
        })
        .catch(error => {
            console.error('Error fetching time slots:', error);
        })
    }
    const handleSubmit = () => {
        if(!date||!selectedTime||!count){
            setWarning(true);
            return
        } 
        dispatch(setInfo({
            date: date.format('YYYY-MM-DD'),     
            time: selectedTime.slice(0,5),
            people: count,    
            remark,
            theme: selectedTheme
          }));
        setWarning(false);
        dispatch(closeBox());
    }

    useEffect(() => {
        searchTimeSlot(dayjs().format('YYYY-MM-DD'));
    }, []);
    useEffect(() => {
        generateAvailabilityMap(timeSlotList, count);
    }, [timeSlotList, count]);
    return <div>
        {reserveStore.open && <div className={style.container}>
            <div className={style.close} onClick={()=>dispatch(closeBox())}>X</div>
            <div className={style.title}>訂位選項</div>
            <div className={style.selectContainer}>
                <div className={style.dateContainer}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar  sx={{width: datePickSize.width, '& .MuiDayCalendar-weekContainer': {
      margin: datePickSize.margin}}} value={date} minDate={dayjs()} onChange={(newValue) => handleDateChange(newValue)} />
                  </LocalizationProvider>
                </div>
                <div className={style.detailContainer}>
                    <div className={style.peopleContainer}>
                        <div className={style.subTitle}>人數</div>
                        <div className={style.counts}>
                            <div onClick={()=>decrementCount()} className={style.button}>-</div>
                            <div className={style.count}>{count}</div>
                            <div onClick={()=>incrementCount()} className={style.button}>+</div>
                        </div>
                    </div>
                    <div className={style.timeContainer}>
                        <div className={style.subTitle}>時間</div>
                        <div className={style.times}>
                        {timeSlotList.map((time) => (
                            <div key={time.time_slot} className={classNames(style.timeItem,selectedTime==time.time_slot && style.active,availabilityMap[time.time_slot.slice(0,5)] == false && style.disable)} onClick={() => toggleTime(time.time_slot)}>
                                {time.time_slot.slice(0,5) }
                            </div>
                        ))}
                        </div>
                        {warning && <div className={style.warning}>請選擇時間</div>}
                    </div>
                </div>
            </div>
            <div className={style.title}>聚餐主題<span>(可選填)</span></div>
            <div className={style.themeContainer}>
                {themeList.map((theme) => (
                    <div onClick={()=>toggleTheme(theme.id)} key={theme.id} className={classNames(style.theme,selectedTheme && selectedTheme.id === theme.id && style.active)}>{theme.name}</div>
                ))}
            </div>
            <div className={style.remarkContainer}>
                <div className={style.remarkInput}>
                    <textarea placeholder='附加資訊(選填)' maxLength={100} value={remark} onChange={(e) => setRemark(e.target.value)}/></div>
                <div className={style.remarkContent}>餐廳未必能配合所有要求，敬請留意。<br/>({remark.length} / 100)</div>
            </div>
            <div className={style.confirm} onClick={()=>handleSubmit()}>確定</div>
        </div>}
    </div>
  }
  
  export default ReserveBox