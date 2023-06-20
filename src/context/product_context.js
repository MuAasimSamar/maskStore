import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";

const Appcontext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState ={
  isloading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
          const res = await axios.get(url);
          const products = await res.data;
          dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
          dispatch({ type: "API_ERROR" });
        }
      };

     // my 2nd api call for single product

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

      useEffect(() => {
        getProducts(API);
      }, []);

    return ( 
    <Appcontext.Provider value={{...state, getSingleProduct }}> {children} </Appcontext.Provider>
    )
}

// custom hooks
const useProductContext = () => {
    return useContext(Appcontext);
  };
  
  export { AppProvider, Appcontext, useProductContext };