import React, { useState } from 'react';
import { connect } from 'react-redux';
import MTree from '../../components/Tree';
import { reactTreeData } from '../../config/treeData';
import MTable from '../../components/MTable';
import Header from '../../components/Header';
import MModel from '../../components/MModel';
import { EllipsisOutlined } from '@ant-design/icons';
import { setSelectTree, closeTree } from '../../model/action';
import { Button } from 'antd';

import './index.less';

interface IProps {
  selected: any;
  setSelectTree: any;
  isShowTree: any;
  closeTree: any;
}

const UseReact: React.FC<IProps> = ({
  selected, setSelectTree, isShowTree, closeTree,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showModel = () => {
    setVisible(true);
  }

  const closeModel = () => {
    setVisible(false);
  }

  const onSubmit = () => {
    setVisible(false);
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

  const selectItem = (data: string[]) => {
    setSelectTree({ data, library: 'react' });
  }


  const controlDisplayOfTree = () => {
    closeTree({ data: !isShowTree.react, library: 'react' });
  }

  return (
    <div className='reactWrapper' >
      <MTree
        data={reactTreeData}
        selectItem={selectItem}
        selected={selected.react}
        isShowTree={isShowTree.react}
        controlDisplayOfTree={controlDisplayOfTree}
      />
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
          <div className='content'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
              return (
                <div className='model-content' key={i}>
                  <span className='contentTitle'>name:</span>
                  <div className='modelInput'>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                </div>
              )
            })}
          </div>
          <div className='actionWrapper'>
            <Button className='modelBtn' type='primary' onClick={onSubmit}>确定</Button>
            <Button className='modelBtn' onClick={() => closeModel && closeModel()}>取消</Button>
          </div>
        </div>
      </MModel>
    </div >
  )
};

export default connect(
  (state: any) => ({
    selected: state.treeReducer,
    isShowTree: state.closeTreeReducer,
  }),
  { setSelectTree, closeTree }
)(UseReact);
