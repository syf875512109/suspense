import React from 'react';

export function fetchProfileData() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
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
  console.log('status', status, typeof suspender.then);
  return {
    read() {
      if (status === "pending") {
        console.log('throw promise')
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

function fetchUser() {
  console.log("fetch user...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched user");
      resolve({
        name: "Ringo Starr",
        age: 19,
      });
    }, 1000);
  });
}

function fetchPosts() {
  console.log("fetch posts...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts");
      resolve([
        {
          id: 0,
          text:
            "I get by with a little help from my friends"
        },
        {
          id: 1,
          text:
            "I'd like to be under the sea in an octupus's garden"
        },
        {
          id: 2,
          text:
            "You got that sand all over your feet"
        }
      ]);
    }, 2000);
  });
}

const dataSource = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'ming', age: 19 });
    }, 2000)
  })
}

const d = fetchProfileData();

const d1 = wrapPromise(dataSource());

function List() {
  const data = d1.read();
  const date = Date.now();
  // while (Date.now() - date < 2000) {

  // }
  // throw 1000;
  return (
    <div>
      {/* <h1>个人信息</h1> */}
      <div className="person-message">
        <h2>name: {data.name}</h2>
        <h2>age: {data.age}</h2>
      </div>
    </div>
  )
}

export default List;