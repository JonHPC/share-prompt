// app/api/users/[id]/posts/route.js

import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {

  const creator = params.id;

  try {
    await connectToDB();

    // Find all of the posts from a specific creator
    const posts = await Prompt.find({creator}).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 })

  } catch (error) {
    return new Response(`Failed to fetch all posts from creator: ${creator}`, { status: 500 })
  }
}