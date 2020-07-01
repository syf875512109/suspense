import React, { Suspense } from 'react';
import List from './List';
import { Button, Spin, Divider } from 'antd';
import InfoTraditional from './Component/Traditional';
import Current from './Component/Current';

import Code from './Component/Code';
import process from './process.svg';

// import Suspense from './Suspense';
// const Other = React.lazy(() => import('./List/index.js'))

function App() {
  const [v1, setV1] = React.useState(false);
  const [v2, setV2] = React.useState(false);
  const [v3, setV3] = React.useState(false);
  const [v4, setV4] = React.useState(false);
  const [v5, setV5] = React.useState(false);

  const handleClick = () => {
    setV1(!v1)
  }

  const handleClick2 = () => {
    setV2(!v2)
  }

  const handleClick3 = () => {
    setV3(!v3)
  }

  const handleClick4 = () => {
    setV4(!v4)
  }

  const handleClick5 = () => {
    setV5(!v5)
  }

  return (
    <div>
      <div className="antd-test-suspense">
        <div className="suspense-col1">
          <Button type="primary" onClick={handleClick}>个人信息Hooks</Button>
          <Divider />
          {v1 && <InfoTraditional />}
        </div>
        <div className="suspense-col2">
          <Button type="primary" onClick={handleClick3}>代码</Button>
          <Divider />
          {v3 && (
            <Code
              str={`
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

function PersonalInfo() {
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

export default PersonalInfo;
            `}
            />
          )}
        </div>
      </div>
      <div className="antd-test-suspense">
        <div className="suspense-col1">
          <Button type="primary" onClick={handleClick2}>个人信息Suspense</Button>

          <Button type="primary" onClick={handleClick5} style={{ marginLeft: '20px' }}>图片</Button>
          <Divider />
          <Suspense fallback={<Spin />}>
            {v2 && <Current />}
          </Suspense>
          <div>
            {v5 && <img src={process} />}
          </div>
        </div>
        <div className="suspense-col2">
          <Button type="primary" onClick={handleClick4}>代码</Button>
          <Divider />
          {v4 && (
            <Code
              str={`
function PersonalInfo() {
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
<Suspense fallback={<Spin />}>
    <PersonalInfo />
</Suspense>

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

export default PersonalInfo;



function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
            `}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
