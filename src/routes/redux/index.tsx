import React from 'react';
import { Input } from 'antd';
import { config } from '../../config/constants';
import Header from '../../components/Header';
import './index.less';

const Redux: React.FC = () => {
  return (
    <div className='wrapper'>
      <div className='left'>
        {
          config.map(i => {
            return (
              <div key={i.key} className='info'>
                <span className='text'>{i.info}</span>
                <Input className='input' placeholder={i.placeholder} />
              </div>
            )
          })
        }
      </div>
      <div className='right'>
        <Header>
          <div>REDUX</div>
        </Header>
      </div>
    </div>
  )
};

export default Redux;
