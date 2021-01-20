import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Motion from '../motion';
import './index.less';

const Container: React.FC = () => {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    hideSourceOnDrag,
  ])
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='dndContainer'>
        <Motion hideSourceOnDrag={hideSourceOnDrag} />
        <div>
          <label htmlFor="hideSourceOnDrag">
            <input
              id="hideSourceOnDrag"
              type="checkbox"
              checked={hideSourceOnDrag}
              onChange={toggle}
            />
            <small>Hide the source item while dragging</small>
          </label>
        </div>
      </div>
    </DndProvider>
  )
}

export default Container;
