import style from './Cover.module.css';
import { useSelector,useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { closeBox } from '../../store/reserveSlice';
function Cover() {
    const reserveStore = useSelector((state: RootState) => state.reserve);
    const dispatch = useDispatch();
    return (
        <div>{reserveStore.open && <div className={style.cover} onClick={()=>dispatch(closeBox())}></div>}</div>
    )
  }
  
  export default Cover