import { createSlice } from "@reduxjs/toolkit";
interface Shopping {
  id: string;
  name: string;
  info: string;
  pic: string;
  price: number;
  count: number;
}
interface ShoppingState {
  account:string;
  open: boolean;
  count:number;
  productList: Shopping[];
  total:number;
  discount:number;
  orderInfo:OrderInfo
}
interface OrderInfo{
  ord_number:string;
  ord_time:string;
  name:string;
  date:string;
  end_time:string;
  list:string;
  price:number;
  discount:number;
  point:number;
  remark:string;
  phone_number:string;
  email:string
}

const calcTotal = (list: Shopping[]) => {
  return list.reduce((sum, item) => sum + item.price * item.count, 0);
};
const calcCount = (list: Shopping[]) => {
  return list.reduce((sum, item) => sum + item.count, 0);
};

const initialState: ShoppingState = {
  account:"",
  open: false,
  productList: [],
  count:0,
  total: 0,
  discount:0,
  orderInfo: {
    ord_number: '',
    ord_time: '',
    name: '',
    date: '',
    end_time: '',
    list: '',
    price: 0,
    discount: 0,
    point: 0,
    remark: '',
    phone_number: '',
    email: ''
  }
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addProduct(state, actions) {
      const product = actions.payload;
      const existingProduct = state.productList.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.count += product.count;
      } else {
        state.productList.push(product);
      }
      state.total = calcTotal(state.productList);
      state.count = calcCount(state.productList);
      localStorage.setItem(`${state.account}_productList`, JSON.stringify(state.productList));
    },
    addCount(state, actions) {
      const product = actions.payload;
      const existingProduct = state.productList.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.productList.push({ ...product, count: 1 });
      }
      state.total = calcTotal(state.productList);
      state.count = calcCount(state.productList);
      localStorage.setItem(`${state.account}_productList`, JSON.stringify(state.productList));
    },
    reduceCount(state, actions) {
      const product = actions.payload;
      const existingProduct = state.productList.find(p => p.id === product.id);
      if (existingProduct) {
        if (existingProduct.count > 1) {
          existingProduct.count -= 1;
        } else {
          state.productList = state.productList.filter(p => p.id !== product.id);
        }
      }
      state.total = calcTotal(state.productList);
      state.count = calcCount(state.productList);
      localStorage.setItem(`${state.account}_productList`, JSON.stringify(state.productList));
    },
    deleteProduct(state, actions) {
      const product = actions.payload;
      state.productList = state.productList.filter(p => p.id !== product.id);
      state.total = calcTotal(state.productList);
      state.count = calcCount(state.productList);
      localStorage.setItem(`${state.account}_productList`, JSON.stringify(state.productList));
    },
    cleanProduct(state){
      state.productList=[]
      state.total = calcTotal(state.productList);
      state.count = calcCount(state.productList);
      localStorage.setItem(`${state.account}_productList`, JSON.stringify(state.productList));
    },
    useDiscount(state, actions) {
      state.discount = actions.payload
    },
    setOrderInfo(state, actions) {
      state.orderInfo = actions.payload
    },
    setShoppingAccount(state, actions) {
      state.account = actions.payload
    },
    initShoppingCart(state, actions){
      state.productList = actions.payload
      state.total = calcTotal(state.productList);
      state.count = calcCount(state.productList);
    }
  },
});

export const { addProduct,addCount,reduceCount,deleteProduct,useDiscount,cleanProduct,setOrderInfo,setShoppingAccount,initShoppingCart } = shoppingSlice.actions;
export default shoppingSlice.reducer;
