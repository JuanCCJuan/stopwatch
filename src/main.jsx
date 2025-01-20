{/* DEPENDENCIES */}
import React from 'react';
import ReactDOM from 'react-dom/client';

{/* STYLES */}
import './main.css';

{/* COMPONENTS */}
import { Stopwatch } from './components/Stopwatch/Stopwatch';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <Stopwatch/>
  </React.StrictMode>
);