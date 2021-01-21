import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import './index.less';

interface BoxTypes {
  id: any,
  left: number,
  top: number,
  hideSourceOnDrag: any,
  children: any
}

const Box = ({ id, left, top, hideSourceOnDrag, children }: BoxTypes) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: 'box' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }
  return (
    <div ref={drag} style={{ left, top }} className='drag'>
      {children}
    </div>
  )
}

const Motion = ({ hideSourceOnDrag }: { hideSourceOnDrag: any }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 0, left: 10, title: 'Drag me around' },
  } as any)
  const [, drop] = useDrop({
    accept: 'box',
    drop(item: any, monitor: any) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveBox(item.id, left, top)
      return undefined
    },
  })
  const moveBox = (id: number, left: number, top: number) => {
    setBoxes(
      update(boxes, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
  }
  return (
    <div ref={drop} className='drop'>
      {Object.keys(boxes).map(key => {
        const { left, top, title } = boxes[key];
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        )
      })}
    </div>
  )
}

export default Motion;
