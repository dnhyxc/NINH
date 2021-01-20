import React from 'react';
import './index.less';

interface IProps {
  children: any;
  title?: string;
}

const Header: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className='header'>
      <div className='headerTitle'>{title}</div>
      <div className='headerContent'>
        {children}
      </div>
    </div>
  )
}

export default Header;