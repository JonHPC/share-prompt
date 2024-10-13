// app/update-prompt/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();

  // Use search params to get the id from the api call
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  
  const [submitting, setSubmitting] = useState(false);   
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag
      });
    };

    // Only call this is promptId exists
    if(promptId) {
      getPromptDetails();
    }
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) {
      return alert("Missing PromptID!");
    } 

    // PATCH request to update a prompt
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      // Uppn success, redirect back to the home page
      if(response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(`[POST error] Failed to update prompt with error message: ${error}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt