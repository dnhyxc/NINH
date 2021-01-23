import React, { useCallback } from 'react';
import { Tree } from 'antd';

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
  selectItem?: (data: string[]) => void;
  isShowTree: boolean;
  controlDisplayOfTree?: () => void;
}

const MTree: React.FC<IProps> = ({
  data, selected, selectItem, controlDisplayOfTree, isShowTree,
}) => {
  const onCloseTree = useCallback(() => {
    controlDisplayOfTree && controlDisplayOfTree();
  }, [controlDisplayOfTree]);

  const onSelectItem = useCallback((data) => {
    selectItem && selectItem(data);
  }, [selectItem]);

  return (
    <div className={isShowTree ? 'treeClose' : 'treeWrapper'}>
      <div className={'treeList'}>
        <Tree defaultExpandAll blockNode defaultSelectedKeys={selected} onSelect={onSelectItem}>
          {treeRender(data.child)}
        </Tree>
      </div>
      <div className='closeTree' onClick={onCloseTree}>{isShowTree ? '>' : '<'}</div>
    </div>
  )
}

export default MTree;