import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const App = () => {
  const [screenWidth, setScreenWidth] = useState(1920);
  const [screenHeight, setScreenHeight] = useState(1080);
  const [times, setTimes] = useState(1);
  useEffect(() => {
    setScreenWidth(screen.width);
    setScreenHeight(screen.height);
    setTimes(screen.width / 1920); // 以1920px為主去做的
  }, []);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo',
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: `${705*times}px`,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            // 針對content
            <List.Item key={item.email} style={{ color: 'white' ,fontSize:`${25*times}px`}}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} size={75* times} />}
                title={
                  <a href="https://ant.design" style={{ color: 'white',fontSize:`${25*times}px` }}>
                    {item.name.last}
                  </a>
                }
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default App;
