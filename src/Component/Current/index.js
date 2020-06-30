import React, { Suspense } from 'react';
// import Suspense from './Suspense';
import { Button, Spin, Divider } from 'antd';

// const Other = React.lazy(() => import('./List/index.js'))

function InfoTraditonalCopy() {
  const info = getInfoData();

  return (
    <div>
      <div className="person-message">
        <h2>name: {info.name}</h2>
        <h2>age: {info.age}</h2>
      </div>
    </div>
  )
}



let data = null;
function getInfoData(url) {
  if (data) {
    return data
  }
  throw new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'suspense',
        age: 20,
      })
    }, 1500)
  }).then(d => {
    data = d;
    return d;
  })
}

export default InfoTraditonalCopy;
