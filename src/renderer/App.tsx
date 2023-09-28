import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import VscodeLayout from './components/Layout/VscodeLayout';

import '../../assets/fonticon/iconfont.css'

export default function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Hello />} />
    //   </Routes>
    // </Router>

    <>
      <VscodeLayout>

      </VscodeLayout>
    </>
  );
}
