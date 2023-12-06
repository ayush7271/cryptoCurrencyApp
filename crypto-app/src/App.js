// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Routes, Route, Link } from 'react-router-dom';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { AppSagaRequest } from './slice/cryptoSlice';

const App = () => {
  const crypto=useSelector((store)=>store)
  console.log(crypto)

  const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(AppSagaRequest())
  },[])


  return (
<>
<h1>fjdijfiji</h1>
</>
  );
};

export default App;
