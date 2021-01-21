import { Input } from 'antd';
import React from 'react';
import Header from '../../components/Header';
import MTree from '../../components/Tree';
import { connect } from 'react-redux';
import { setSelectTree } from '../../model/action';
import { baseJsTreeData } from '../../config/treeData';

import './index.less';

interface IProps {
  selected: any;
  setSelectTree: any;
}

const BaseJs: React.FC<IProps> = ({
  selected, setSelectTree,
}) => {

  const selectItem = (data: string[]) => {
    setSelectTree({ data, library: 'baseJs' });
  }

  return (
    <div className='baseWrapper'>
      <MTree data={baseJsTreeData} library='baseJs' selectItem={selectItem} selected={selected.baseJs} />
      <div className='right'>
        <Header title={'BASEJS'}>
          <Input className='baseInput' />
        </Header>
        content
      </div>
    </div >
  )
}

export default connect(
  (state: any) => ({
    selected: state.treeReducer,
  }),
  { setSelectTree }
)(BaseJs);
