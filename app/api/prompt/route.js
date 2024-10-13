// app/api/prompt/route.js

import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// dynamic forces a refresh instead of reading form the cache
export const dynamic = 'force-dynamic'
export const GET = async (req) => {

  try {
    await connectToDB();

    // Find all of the posts from all creators
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 })

  } catch (error) {
    return new Response(`[GET Error] Failed to fetch all prompts.`, { status: 500 })
  }
}