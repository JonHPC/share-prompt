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
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // GET request to our own API to get feed data
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json()
    ;
    // Update the 'posts' state
    setPosts(data);
  };
  
  // Called at the start to fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter's the prompts based on the search text
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Inputs the tag name into the search bar when clicked
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


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

      {/* All Prompts */}
      {/* If there is text in the search bar, show the search results, otherwise show all posts */}
      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList 
          data={posts} 
          handleTagClick={handleTagClick} 
        />
      )}

    </section>
  )
}

export default Feed