import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css.css"

const Javascript = () => {
  const [data, setdata] = useState([]);
  const [quote, setQuote] = useState('');

// This will run only when it would any change in data as dependencies 
  useEffect(() => {
    if (data.length > 0) {
      getRandomQuote();
    }
  }, [data]);
// function for fetching data from backend using axios 
  const fetchdata = async () => {
    try {
      let response = await axios.get("http://localhost:5000/api/data");
      setdata(response.data);
    } catch (error) {
      console.log("Error retrieved:", error);
    }
  };

  // random data generator function 
  const getRandomQuote = () => {
    if (Array.isArray(data) && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = getRandomString(data[randomIndex].dataArray);
      setQuote(randomQuote);
    } else {
      setQuote('No data available');
    }
  };

  // Helper function to get a random string from an array
  const getRandomString = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  return (
    <>
    <div className='app'>
     <div className='app1'>
     <h1>Quote Generation App</h1>

      <button style={{ backgroundColor: "red",borderRadius:"8px" }} onClick={fetchdata}>
        Click me
      </button>

     </div>
  
      <br></br>
      {/* here we display data as string from arary */}
      <div className='app2'>
      {quote }
      </div>
    </div>
      
     
    </>
  );
};

export default Javascript;


