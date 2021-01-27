import React from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

const DvaJS: React.FC = () => {
  return (
    <div>
      <TextArea />
      <Button type='primary'>DvaJS</Button>
    </div>
  )
}

export default DvaJS;