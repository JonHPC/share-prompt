// app/create-prompt/page.jsx

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [submitting, setSubmitting] = useState(false);   
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // POST request to create a new prompt
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      // Uppn success, redirect back to the home page
      if(response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(`[POST error] Failed to create a new prompt with error message: ${error}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt