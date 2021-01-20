import React, { useState } from 'react';
import MTree from '../../components/Tree';
import { reactTreeData } from '../../config/treeData';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MTable from '../../components/MTable';
import Header from '../../components/Header';
import MModel from '../../components/MModel';
import { EllipsisOutlined } from '@ant-design/icons';

import './index.less';
import { Button } from 'antd';

const UseReact: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showModel = () => {
    setVisible(true);
  }

  const closeModel = () => {
    setVisible(false);
  }

  const onSubmit = () => {
    setVisible(false);
    console.log(11111);
  }

  const renderAction = () => (
    () => {
      return (
        <div className='action-wrapper'>
          <Button className='editButton' onClick={showModel}>EDIT</Button>
          <Button className='editButton'>DELE</Button>
          <EllipsisOutlined className='ellIcon' />
        </div>
      )
    }
  )
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='reactWrapper'>
        <MTree data={reactTreeData} />
        <div className='right'>
          <Header title='REACT'>
            <div>
              search
            </div>
          </Header>
          <div className='tableContent'>
            <MTable renderAction={renderAction} />
          </div>
        </div>
        <MModel
          width={1000}
          closeModel={closeModel}
          visible={visible}
          title={'REACTRECORD'}
          maskClosable={false}
        >
          <div className='model_Wrapper'>
            <div className='content'>content</div>
            <div className='actionWrapper'>
              <Button className='submit' type='primary' onClick={onSubmit}>确定</Button>
              <Button onClick={() => closeModel && closeModel()}>取消</Button>
            </div>
          </div>
        </MModel>
      </div>
    </DndProvider>
  )
};

export default UseReact;
