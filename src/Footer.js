import { useStoreState } from 'easy-peasy'
import React from 'react'

const Footer = () => {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className='Footer'>
        <p>{postCount} blog posts</p>
    </footer>
  )
}

export default Footer
