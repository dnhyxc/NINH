import React, { useCallback, useRef, useState } from 'react';
import { Table } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { tableData, setTableColumns } from '../../config/tableConfig';
import './index.less';

interface DragableBodyRowType {
  index: any,
  moveRow: any,
  className: any,
  style: any,
}

interface IProps {
  renderAction: () => any;
}

const RNDContext = createDndContext(HTML5Backend);
const type = 'DragableBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }: DragableBodyRowType) => {
  const ref: any = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const MTable: React.FC<IProps> = ({
  renderAction,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [data, setData] = useState<any>(tableData);

  const tableRef: any = useRef();

  const columns = setTableColumns(renderAction);

  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onPageChange = (page: number) => {
    tableRef.current.scrollTop = 0
  }

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [data],
  );
  const manager = useRef(RNDContext);

  return (
    <DndProvider manager={manager.current.dragDropManager as any}>
      <div ref={tableRef} className='table-wrapper'>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record: any) => <div style={{ margin: 0 }}>{record.description}</div>,
            // 设置指定item没有展开详情
            // rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          rowSelection={rowSelection}
          dataSource={data}
          components={components}
          onRow={(record, index) => ({
            index,
            moveRow,
          } as any)}
          pagination={{ position: ['bottomCenter'], onChange: onPageChange }}
        />,
      </div>
    </DndProvider >
  )
}

export default MTable;
