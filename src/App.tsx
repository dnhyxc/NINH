import React from 'react';
import MainLayout from './routes/layout';
import './App.less';

interface IProps {
  children: any;
}

const App: React.FC<IProps> = ({ children }) => {
  return (
    <div className="App">
      <MainLayout>{children}</MainLayout>
    </div>
  );
}

export default App;
