import {
  ExploreRounded, AddRounded, HistoryRounded, BookmarkRounded, ListRounded, SearchRounded,
} from '@material-ui/icons';

const sideBarData = [
  {
    title: 'Discover',
    path: '/',
    icon: <ExploreRounded />,
    className: 'nav-text',
    key: 1,
  }, {
    title: 'Create',
    path: '/create',
    icon: <AddRounded />,
    className: 'nav-text',
    key: 2,
  }, {
    title: 'History',
    path: '/history',
    icon: <HistoryRounded />,
    className: 'nav-text',
    key: 3,
  }, {
    title: 'Saved',
    path: '/saved',
    icon: <BookmarkRounded />,
    className: 'nav-text',
    key: 4,
  }, {
    title: 'Categories',
    path: '/categories',
    icon: <ListRounded />,
    className: 'nav-text',
    key: 5,
  }, {
    title: 'Search',
    path: '/search',
    icon: <SearchRounded />,
    className: 'nav-text',
    key: 6,
  },
];

export default sideBarData;
