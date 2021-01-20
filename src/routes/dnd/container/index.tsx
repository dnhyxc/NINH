import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Motion from '../motion';

const Container: React.FC = () => {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    hideSourceOnDrag,
  ])
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Motion hideSourceOnDrag={hideSourceOnDrag} src={'https://pic3.zhimg.com/80/v2-62c7f9b0205c297fe1d38af5a5e39b90_720w.jpg?source=1940ef5c'} />
        <p>
          <label htmlFor="hideSourceOnDrag">
            <input
              id="hideSourceOnDrag"
              type="checkbox"
              checked={hideSourceOnDrag}
              onChange={toggle}
            />
            <small>Hide the source item while dragging</small>
          </label>
        </p>
      </div>
    </DndProvider>
  )
}

export default Container;
