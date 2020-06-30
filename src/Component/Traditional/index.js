import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

const getInfo = () => {
  return new Promise((r) => {
    setTimeout(() => {
      r({
        name: "ming",
        age: 19,
      })
    }, 1500)
  })
}

function InfoTraditonal() {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true)
      const d = await getInfo();
      setInfo(d);
      setLoading(false);
    }
    fetchInfo();
  }, [])

  if (!info || loading) {
    return <Spin />
  }

  return (
    <div>
      <div className="person-message">
        <h2>name: {info.name}</h2>
        <h2>age: {info.age}</h2>
      </div>
    </div>
  )
}

export default InfoTraditonal;




