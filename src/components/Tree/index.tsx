import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Tree } from 'antd';
import { setSelectTree } from '../../model/action';

import './index.less';

const { TreeNode } = Tree;

function treeRender(menuList: any) {
  return (
    <React.Fragment>
      {menuList.map((item: any, i: number) => (
        <TreeNode
          title={item.name} key={item.id}
        >
          {item.child ? treeRender(item.child) : null}
        </TreeNode>
      ))}
    </React.Fragment>
  );
}

interface IProps {
  data: any;
  setSelectTree?: any;
  selected: any;
}

const MTree: React.FC<IProps> = ({
  data, setSelectTree, selected,
}) => {
  const [close, setClose] = useState<boolean>(true);

  const onCloseTree = useCallback(() => {
    setClose(!close);
  }, [close]);

  console.log(selected, '------------------');

  const onSelectItem = useCallback((e) => {
    setSelectTree(e);
  }, [setSelectTree]);

  return (
    <div className={close ? 'treeClose' : 'treeWrapper'}>
      <div className={'treeList'}>
        <Tree defaultExpandAll blockNode defaultSelectedKeys={selected} onSelect={onSelectItem}>
          {treeRender(data.child)}
        </Tree>
      </div>
      <div className='closeTree' onClick={onCloseTree}>{close ? '>' : '<'}</div>
    </div>
  )
}

export default connect(
  (state: any) => ({ selected: state.treeReducer }),
  { setSelectTree }
)(MTree);