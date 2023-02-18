import React, { useEffect, useState } from "react";

export function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  console.log(data);

  return <div>Hello World</div>;
}
