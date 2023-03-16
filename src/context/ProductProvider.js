import React, { createContext, useContext, useEffect, useState } from 'react';
import { useReducer } from 'react';
import { actionTypes } from '../state/ProductState/actionType';
import { initialState, productReducer } from '../state/ProductState/productReducer';

const CONTEXT_PRODUCTS = createContext();

const ProductProvider = ({children}) => {
    const [state,dispatch] = useReducer(productReducer,initialState);

    useEffect(() => {
        dispatch({type: actionTypes.FETCHING_START})
      fetch('/data.json')
        .then(res => res.json())
        .then(data => dispatch({type: actionTypes.FETCHING_SUCCESS, payload:data}))
        .catch(()=>{
            dispatch({type: actionTypes.FETCHING_ERROR})
        })
    }, []);
  
    const value = {
      state,dispatch
    }

    return <CONTEXT_PRODUCTS.Provider value={value}>
        {children}
    </CONTEXT_PRODUCTS.Provider>
};

export const useProducts = () =>{
    const context = useContext(CONTEXT_PRODUCTS);
    return context;
}
export default ProductProvider;