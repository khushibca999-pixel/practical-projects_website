import { useState } from 'react';
//import "./assets/Double_arrow.png";
//import "./assets/india_flag.png";
//import "./assets/USA_flag.png";
import "./App.css";

function App() {
  //Fixed sample rate : no API or internet required .Here we will use API after getting internet.
  const USD_TO_INR = 85.73;

  //React state
  const [amount,setAmount]=useState("1");
  const [fromCurrency,setFromcurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("INR");
  const [result,setResult]=useState(null);
  const [error,setError]=useState("");

  //Valild the input befor calculation.
  function validAmount(){

    if(amount.trim()==="")
    {
      setError("Please enter an amount.");
      return null;
    }

    const value=Number(amount);

    if (!Number.isFinite(value))
    {
      setError("Please enter a valid number.");
      return null;
    }

    if(value<=0)
    {
      setError("Amount must be greater than zero.");
      return null;
    }

    return value;

  }

  //Get the rate for selected currency direction.
  function getRate()
  {
    if(fromCurrency===toCurrency)
    {
      return 1;
    }

    if(fromCurrency==="USD" && toCurrency==="INR")
    {
      return USD_TO_INR;
    }

    //Reverse the rate for INR -> USD.
    return 1/USD_TO_INR;

  }

  //Convert the amount using the fixed rate.
  function convertCurrency(value)
  {
    return value*getRate();
  }

  //Handle the form Submission.
  function handleConvert(event)
  {
    event.preventDefault();

    setError("");
    setResult(null);

    const value=validAmount();

    if(value===null)
    {
      return;
    }

    const converted=convertCurrency(value);
    
    if(!Number.isFinite(converted))
    {
      setError("The result is too large.");
      return ;
    }

    setResult(converted);
          
  }

  //Reverse the selected currencies.
  function handleSwap()
  {
    setFromcurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setError("");
  }

  //Restore the initial form.
  function handleReset()
  {
    setAmount("1");
    setFromcurrency("USD");
    setToCurrency("INR");
    setResult(null);
    setError("");
  }

  return (

    <main className="page">

      <section className="converter-card">

        <h1>Currency Converter</h1>

        <form onSubmit={handleConvert} noValidate>

          <label htmlFor="amount">Enter Amount:</label>

          <input 
          type="text" 
          id="amount"
          min="0"
          step="any"
          value={amount}
          placeholder="Enter amount"
          onChange={(event)=>{
            setAmount(event.target.value);
            setError("");
            setResult(null);
          }}
          />

          <div className="currency-row">
            <div className="currency-field">
              <label htmlFor="fromCurrency">From</label>
              <select id="fromCurrency"
              value={fromCurrency}
              onChange={(event)=>{
                setFromcurrency(event.target.value);
                setResult(null);
                setError("");
              }}>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
              </select>

            </div>
                
            <button type="button"
            className="swap-button"
            onClick={handleSwap}
            aria-label="Swap currencies">
              swap
            </button>

            <div className="currency-field">
              <label htmlFor="toCurrency">To</label>

              <select id="toCurrency"
              value={toCurrency}
              onChange={(event)=>{
                setToCurrency(event.target.value);
                setResult(null);
                setError("");
              }}>
                <option value="INR"> INR</option>
                <option value="USD"> USD</option>

              </select>
            </div>

          </div>
          
          <p className="rate-text">
            1{fromCurrency}={""}{getRate().toFixed(4)}{toCurrency}
          </p>
          
          
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          {result !==null && (
            <p className="result-text" aria-live="polite">
              {Number(amount).toLocaleString("en-US")}{""}
              {fromCurrency}={""}{result.toLocaleString("en-US",{
                maximumFractionDigits:4,})}{""}
                {toCurrency}
            </p>
          )}

          
          <button className="convert-button"
          type="submit">
            Get Exchange Rate
          </button>

          <button className="reset-button"
          type="button"
          onClick={handleReset}>
            Reset
          </button>
           
        </form>
        
      </section>
    </main>
  );  
     
}

export default App;
