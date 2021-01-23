import React, { useCallback, useState } from 'react';
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
}

const MTree: React.FC<IProps> = ({
  data, selected, selectItem,
}) => {
  const [close, setClose] = useState<boolean>(false);

  const onCloseTree = useCallback(() => {
    setClose(!close);
  }, [close]);

  const onSelectItem = useCallback((data) => {
    selectItem && selectItem(data);
  }, [selectItem]);

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

export default MTree;