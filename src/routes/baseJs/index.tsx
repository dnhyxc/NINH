import { Input } from 'antd';
import React from 'react';
import Header from '../../components/Header';
import MTree from '../../components/Tree';
import { baseJsTreeData } from '../../config/treeData';

import './index.less';

const BaseJs: React.FC = () => {
  return (
    <div className='baseWrapper'>
      <MTree data={baseJsTreeData} />
      <div className='right'>
        <Header title={'BASEJS'}>
          <Input className='baseInput' />
        </Header>
        content
      </div>
    </div >
  )
}

export default BaseJs;
