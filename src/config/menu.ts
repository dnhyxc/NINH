const menuList = [
  {
    title: 'RESOURCE',
    key: 'media',
    path: '',
    type: 'menu',
    children: [
      {
        key: 'home',
        path: '/app/home',
        power: true,
        title: 'HOME',
        type: 'function'
      },
      {
        key: 'baseJs',
        path: '/app/basejs',
        power: true,
        title: 'BASEJS',
        type: 'function'
      },
    ]
  },
  {
    title: 'FRAME',
    key: 'frame',
    path: '',
    type: 'menu',
    children: [
      {
        key: 'react',
        path: '/app/react',
        power: true,
        title: 'REACT',
        type: 'function'
      },
      {
        key: 'redux',
        path: '/app/redux',
        power: true,
        title: 'REDUX',
        type: 'function'
      },
      {
        key: 'dvajs',
        path: '/app/dvajs',
        power: true,
        title: 'DVAJS',
        type: 'function'
      },
      {
        key: 'dnd',
        path: '/app/dnd',
        power: true,
        title: 'REACTDND',
        type: 'function'
      },
      {
        key: 'webpack',
        path: '/app/webpack',
        power: true,
        title: 'WEBPACK',
        type: 'function'
      },
    ]
  },
  {
    title: 'ADVANCED',
    key: 'advanced',
    path: '',
    type: 'menu',
    children: [
      {
        key: 'auth',
        path: '/app/auth',
        power: true,
        title: 'AUTH',
        type: 'function'
      },
    ]
  }
]

export default menuList;