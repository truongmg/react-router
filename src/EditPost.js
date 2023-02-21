import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import format from 'date-fns/format'
import { useStoreActions, useStoreState } from 'easy-peasy'


const EditPost = () => {
    const { id } = useParams();
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const getPostById = useStoreState((state) => state.getPostById);

    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const editPost = useStoreActions((actions) => actions.editPost);
    
    const post = getPostById(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditBody, setEditTitle]);

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMM dd, yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatePost);
        navigate('/');
    }

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input type="text" id="postTitle" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        <label htmlFor="postBody">Post:</label>
                        <textarea id="postBody" value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>No post found</h2>
                    <p><Link to='/'>Visit our homepage</Link></p>
                </>
            }
        </main>
    )
}

export default EditPost
