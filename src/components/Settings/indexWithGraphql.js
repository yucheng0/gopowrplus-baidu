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
      body: JSON.stringify({
        query: '{ getNowPlayingList {id,name,price,post} }',
      }),
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
      <button type="button" onClick={getNowPlayingList}>
        press me
      </button>
    </div>
  );
}
