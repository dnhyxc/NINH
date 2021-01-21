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
}

const MTree: React.FC<IProps> = ({
  data,
}) => {
  const [close, setClose] = useState<boolean>(true);
  const [selectItem, setSelectItem] = useState<string[]>(['base']);

  const onCloseTree = useCallback(() => {
    setClose(!close);
  }, [close]);

  const onSelectItem = useCallback((e) => {
    setSelectItem(e);
  }, []);

  return (
    <div className={close ? 'treeClose' : 'treeWrapper'}>
      <div className={'treeList'}>
        <Tree defaultExpandAll blockNode defaultSelectedKeys={selectItem} onSelect={onSelectItem}>
          {treeRender(data.child)}
        </Tree>
      </div>
      <div className='closeTree' onClick={onCloseTree}>{close ? '>' : '<'}</div>
    </div>
  )
}

export default MTree;