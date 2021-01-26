import React from 'react';
import { Carousel } from 'antd';
import './index.less';

const Login: React.FC = () => {
  return (
    <div className='login'>
      <Carousel autoplay effect="fade" className='carousel' dots={false}>
        <img className='carousel-image' src="https://pic4.zhimg.com/80/v2-7fbdb98c77a0efd4de69c05dfaa7fdd9_720w.jpg?source=1940ef5c" alt="" />
        <img className='carousel-image' src="https://pic2.zhimg.com/80/v2-23a62728f9364b6868d10d9607392c7e_720w.jpg?source=1940ef5c" alt="" />
        <img className='carousel-image' src="https://pic1.zhimg.com/80/v2-82a2709b2e63487e2fb605995387f579_720w.jpg?source=1940ef5c" alt="" />
      </Carousel>
    </div>
  )
}

export default Login;