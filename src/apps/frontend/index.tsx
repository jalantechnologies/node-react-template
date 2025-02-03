import 'frontend/satoshi.css';
import 'frontend/style.css';
import App from 'frontend/app.component';
import React from 'react';
import ReactDOM from 'react-dom/client';

const container = document.getElementById('app');

ReactDOM.createRoot(container as ReactDOM.Container).render(<App />);
