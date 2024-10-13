// components/PromptCard.jsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    // Copy the prompt text and set the 'copied' state
    setCopied(post.prompt);
    // Copy prompt text to clipboard
    navigator.clipboard.writeText(post.prompt);
    // Reset copied icon after 3 seconds
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">

      {/* Profile + copy button section */}
      <div className="flex justify-between items-start gap-5">

        {/* Profile section */}
        <div 
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          
        >
          {/* Profile image of poster */}
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          {/* Username and email */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy button section, check state if already copied, show appropriate icon */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* Prompt section */}
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>

      {/* Tag section */}
        {/* Click on tag to see similar tags */}
      <p 
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {/* Check if current logged in user if the creator of that prompt AND we are on the Profile page*/}
      {/* If so, then show this div */}
      {session?.user.id === post.creator._id 
        && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard