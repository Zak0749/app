import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './themes/dark.scss';
import './themes/light.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
