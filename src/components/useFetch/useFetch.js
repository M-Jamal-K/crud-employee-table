import { useState, useEffect } from "react";

const useFetch = (url, reqMethod = "GET", counter) => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const methodOptionHandler = (postData) => {
    if (reqMethod === "POST") {
      setOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
    } else if (reqMethod === "DELETE") {
      setOptions({
        method: "DELETE"
      });
    } else if (reqMethod === "PUT") {
      setOptions({
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
    }
  };

  useEffect(() => {
    const fetchData = async (fetchOptions) => {
      setisPending(true);
      try {
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setisPending(false);
        setError(null);
        setData(data);
      } catch (error) {
        setisPending(false);
        setError(`Could not fetch data!!! error type --> '${error.message}'`);
      }
    };

    if (reqMethod === "POST" && options) fetchData(options);
    if (reqMethod === "PUT" && options) fetchData(options);
    if (reqMethod === "DELETE" && options) fetchData(options);
    if (reqMethod === "GET") fetchData();

    return () => {
      console.log("CleaneUP");
    };
  }, [url, options, reqMethod, counter]);
  return {
    data,
    isPending,
    error,
    methodOptionHandler
  };
};

export default useFetch;
