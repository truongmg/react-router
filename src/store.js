import { createStore, thunk, computed, action } from 'easy-peasy'
import api from './api/posts'

export default createStore({
    posts: [],
    setPosts: action((actions, payload) => {
        actions.posts = payload;
    }),
    postTitle: '',
    setPostTitle: action((actions, payload) => {
        actions.postTitle = payload;
    }),
    postBody: '',
    setPostBody: action((actions, payload) => {
        actions.postBody = payload;
    }),
    editTitle: '',
    setEditTitle: action((actions, payload) => {
        actions.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((actions, payload) => {
        actions.editBody = payload;
    }),
    search: '',
    setSearch: action((actions, payload) => {
        actions.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((actions, payload) => {
        actions.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find(post => (post.id).toString() === id)
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {
            const response = await api.post('/posts', newPost);
            actions.setPosts([...posts, response.data]);
            actions.setPostTitle('');
            actions.setPostBody('');
        } catch (error) {
            console.log(error.message);
        }
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const { posts } = helpers.getState();
        try {
            await api.delete(`/posts/${id}`);
            actions.setPosts(posts.filter(post => post.id !== id));
          } catch (error) {
            console.log(error.message);
          }
    }),
    editPost: thunk(async (actions, updatePost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = updatePost;
        try {
            const response = await api.put(`/posts/${id}`, updatePost);
            actions.setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
            actions.setEditTitle('');
            actions.setEditBody('');
        } catch (error) {
            console.log(error.message);
        }
    })
});