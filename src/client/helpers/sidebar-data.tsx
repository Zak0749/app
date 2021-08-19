import {
  FaSafari, FaPlus, FaHistory, FaBookmark, FaList, FaSearch,
} from 'react-icons/all';

const sideBarData = [
  {
    title: 'Discover',
    path: '/',
    icon: <FaSafari />,
    className: 'nav-text',
    key: 1,
  }, {
    title: 'Create',
    path: '/create',
    icon: <FaPlus />,
    className: 'nav-text',
    key: 2,
  }, {
    title: 'History',
    path: '/history',
    icon: <FaHistory />,
    className: 'nav-text',
    key: 3,
  }, {
    title: 'Saved',
    path: '/saved',
    icon: <FaBookmark />,
    className: 'nav-text',
    key: 4,
  }, {
    title: 'Categorys',
    path: '/categorys',
    icon: <FaList />,
    className: 'nav-text',
    key: 5,
  }, {
    title: 'Search',
    path: '/search',
    icon: <FaSearch />,
    className: 'nav-text',
    key: 6,
  },
];

export default sideBarData;
