import React from 'react';
import Header from '../../components/Header';
import './index.less';


const Home: React.FC = () => {
  return (
    <div className='contentWrapper'>
      <Header title='HOME'>
        <div>
          header
        </div>
      </Header>
      <div className='content'>content</div>
    </div>
  )
}

export default Home;
