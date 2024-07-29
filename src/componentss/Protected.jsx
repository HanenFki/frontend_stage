/* import React, { useState, useEffect, useRef } from "react";
import Home from '../pages/home/home'
import axios from 'axios';
import Content from "../Content";
const protected = ({ token }) => {
  const isRun = useRef(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    const config = {
      headers: {
        authorization: Bearer ${token},
      },
    };

    axios
      .get("http://localhost:3000/", config)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Content/>
 </>     
  );
};

export default protected; */

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Content from "../Content";

const Protected = ({ token,roles }) => {
  const isRun = useRef(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    const config = {
      headers: {
        authorization: `Bearer ${token}`, // Corrected the authorization header
      },
    };

    axios
      .get("http://localhost:3000/", config)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [token,roles]); // Added token to the dependency array

  return (
    <>
      <Content data={data} /> {/* Pass data to Content if needed */}
    </>
  );
};

export default Protected;
