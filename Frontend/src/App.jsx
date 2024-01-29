import './App.css'
import Blog from './components/Blog';
import BlogHome from './components/BlogHome';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<BlogHome />} />
          <Route path="/blog/:blogId" element={<Blog />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
