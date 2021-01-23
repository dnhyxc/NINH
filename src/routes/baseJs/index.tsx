import React from 'react';
import { Input } from 'antd';
import Header from '../../components/Header';
import MTree from '../../components/Tree';
import { connect } from 'react-redux';
import { setSelectTree, closeTree } from '../../model/action';
import { baseJsTreeData } from '../../config/treeData';

import './index.less';

interface IProps {
  selected: any;
  setSelectTree: any;
  isShowTree: any;
  closeTree: any;
}

const BaseJs: React.FC<IProps> = ({
  selected, setSelectTree, isShowTree, closeTree,
}) => {
  const selectItem = (data: string[]) => {
    setSelectTree({ data, library: 'baseJs' });
  }

  const controlDisplayOfTree = () => {
    closeTree({ data: !isShowTree.baseJs, library: 'baseJs' });
  }

  return (
    <div className='baseWrapper'>
      <MTree
        data={baseJsTreeData}
        selectItem={selectItem}
        selected={selected.baseJs}
        isShowTree={isShowTree.baseJs}
        controlDisplayOfTree={controlDisplayOfTree}
      />
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
    isShowTree: state.closeTreeReducer,
  }),
  { setSelectTree, closeTree }
)(BaseJs);
