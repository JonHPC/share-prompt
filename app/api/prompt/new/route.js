// app/api/prompt/new/route.js

import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
  // Extract data from the POST request
  const { userId, prompt, tag } = await req.json(); 

  try {
    // Connect to the DB (must connect every time since this is a lambda)
    await connectToDB();

    // Create a new Prompt and pass in the data in an object
    const newPrompt = new Prompt({ 
      creator: userId, 
      prompt,
      tag
    });

    // Save the data to the DB
    await newPrompt.save();

    // Return the response and status 201 (which means 'created')
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    // Return an error message, (status 500 is a 'server error')
    return new Response(`[POST error] userId: ${userId} failed to create a new prompt.`, { status: 500 });
  }
}