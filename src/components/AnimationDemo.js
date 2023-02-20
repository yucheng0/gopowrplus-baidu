import { Button } from 'antd';
import { Animate, AnimateGroup, AnimateKeyframes } from 'react-simple-animate';

export default () => (
  <>
    <h2 style={{ color: 'brown', fontWeight: 'bold' }}> 動畫展示 </h2>
    {/* animate individual element. */}
    <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
      <h1>React simple animate</h1>
    </Animate>

    {/* animate keyframes with individual element. */}
    <AnimateKeyframes
      play
      iterationCount="infinite"
      keyframes={['opacity: 0', 'opacity: 1']}
    >
      <h1>React simple animate with keyframes</h1>
    </AnimateKeyframes>

    {/* animate group of animation in sequences */}
    <AnimateGroup play>
      {/* 位置移動 */}
      <Animate
        start={{ transform: 'translateX(0px)' }}
        end={{ transform: 'translateX(200px)' }}
        sequenceIndex={0}
        delay={0.3}
        duration={3}
        //easeType= "linear"
        // easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
        easeType="ease-in" // 剛開始慢到後面越來越快
        // easeType= "ease-out"  // 剛開始很快, 到後面越來越慢
        // easeType= "ease-in-out"  // 前面頓一下, 中間快速, 後面又慢
        // easeType= "ease"     // 一路都很快
        // 如果不是要的特效可用貝茲曲線來達成一般而已我覺得ease-in 就行了
      >
        move
      </Animate>

      <Animate
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
        sequenceIndex={1}
        delay={0.3}
        duration={1}
      >
        first
      </Animate>

      <Animate start={{ opacity: 0 }} end={{ opacity: 1 }} sequenceIndex={2}>
        second
      </Animate>
      <Animate start={{ opacity: 0 }} end={{ opacity: 1 }} sequenceIndex={3}>
        third
      </Animate>

      {/* 第4個自己寫的, 它可以有透明度+顏色變化 */}
      <Animate
        start={{ opacity: 0, color: 'red' }}
        end={{ opacity: 1, color: 'blue' }}
        sequenceIndex={4}
        duration={1}
      >
        four
      </Animate>
      {/* 組件全部移動, 往上移動 */}
      <Animate
        start={{ transform: 'translateY(0px)' }}
        end={{ transform: 'translateY(-200px)' }}
        sequenceIndex={5}
        duration={0.5}
      >
        <Button> User</Button>
        <br />
        <Button> Password</Button>
      </Animate>
    </AnimateGroup>
  </>
);
