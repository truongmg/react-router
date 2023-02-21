import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Missing from './Missing'
import NewPost from './NewPost'
import EditPost from './EditPost'
import PostPage from './PostPage'
import About from './About'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useStoreActions } from 'easy-peasy'

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
      setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home fetchError={fetchError} isLoading={isLoading} />} />
          <Route exact path='/post' element={<NewPost />} />
          <Route exact path='/edit/:id' element={<EditPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
