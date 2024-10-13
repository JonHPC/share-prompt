// components/Feed.jsx

'use client';

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';

// Since PromptCardList is only used in this component, we can create it here
const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  // Handle search function here
   // Search by prompt
   // Search by tag
   // Search by username
  // Implement click on tag
  // Implement view other profiles

  const handleSearchChange = (e) => {

  }

  // GET request to our own API to get feed data, called at the start
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      // Update the 'posts' state
      setPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      {/* Search bar */}
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>


      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed