import { GRAPHQL_URL } from '@/constants';
import React from 'react';
import request from 'umi-request';
export default function Settings() {
  // 測試Graphql 的格式
  const asyncFetch = () => {
    request(GRAPHQL_URL, {
      method: 'post',
      body: JSON.stringify({ query: '{ age }' }),
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // 底下可以正常成功的
  // const asyncFetch = () => {
  //   request
  //   .post (GRAPHQL_URL, {
  //     data:
  //       JSON.stringify({query: "{ age }"})
  //     }
  //   )
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };

  // 底下可以正常成功的
  // const age = () => {
  //   // 要加http://
  //   fetch(GRAPHQL_URL, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   },
  //   body: JSON.stringify({query: "{ age }"})
  // })
  //   .then(r => r.json())
  //   .then(data => console.log('data returned:', data));
  // }

  const getNowPlayingList = () => {
    request(GRAPHQL_URL, {
      method: 'post',
      body: JSON.stringify(
        // 指令要用"" 雙引號包起來
        { query: '{ getNowPlayingList {id,name,price,post} }' },
      ),
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createFilm = () => {
    request(GRAPHQL_URL, {
      method: 'post',
      body: JSON.stringify(
        // 指令要用外層用模版字符串``
        {
          query: `mutation{
      createFilm(input:{name:"yyy", post:"gxsgs", price:300}) {
      id
   } 
  }`,
        },
      ), // 結束request
    })
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFilm = () => {
    request(GRAPHQL_URL, {
      method: 'post',
      body: JSON.stringify(
        // 指令要用外層用模版字符串``
        {
          query: `mutation{
      deleteFilm(id:"638f2d058f6dc3760f871276")
      }`,
        },
      ), // 結束request
    })
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const updateFilm = () => {
    request(GRAPHQL_URL, {
      method: 'post',
      body: JSON.stringify(
        // 指令要用外層用模版字符串``
        {
          query: `mutation {
      updateFilm(id:"638f418217bab50985e14681",input:{name:"bbb-修改",price:999,post:"ggg-修改"}) {
        id
      }
      }`,
        },
      ), // 結束request
    })
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      Settings page
      <br />
      <button
        type="button"
        onClick={createFilm}
        style={{ backgroundColor: 'blue' }}
      >
        <div> press me to createFilm </div>
      </button>
      <br />
      <button
        type="button"
        onClick={getNowPlayingList}
        style={{ backgroundColor: 'blue' }}
      >
        <div> press me to getNowPlayingList </div>
      </button>
      <br />
      <button
        type="button"
        onClick={deleteFilm}
        style={{ backgroundColor: 'blue' }}
      >
        <div> press me to deleteFilm </div>
      </button>
      <br />
      <button
        type="button"
        onClick={updateFilm}
        style={{ backgroundColor: 'blue' }}
      >
        <div> press me to updateFilm </div>
      </button>
    </div>
  );
}
