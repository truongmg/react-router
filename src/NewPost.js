import { useNavigate } from 'react-router-dom'
import format from 'date-fns/format'
import { useStoreState, useStoreActions } from 'easy-peasy'

const NewPost = () => {
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const savePost = useStoreActions((actions) => actions.savePost);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    navigate('/');
}

  return (
    <main className='NewPost'>
      <h2>New post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input type="text" id="postTitle" required value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
        <label htmlFor="postBody">Post:</label>
        <textarea id="postBody" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost
