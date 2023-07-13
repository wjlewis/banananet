import React from 'react';
import { createRoot } from 'react-dom/client';
import World from './World';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(<World />);
