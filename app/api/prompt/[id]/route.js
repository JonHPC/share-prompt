// app/api/prompt/[id]/route.js

import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read)
export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    await connectToDB();

    // Find one prompt based on id
    const prompt = await Prompt.findById(id).populate("creator");

    //If there is no prompt, return 404 not found
    if(!prompt) {
      return new Response("Prompt not found.", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response(`[GET Error] Failed to fetch prompt with id: ${id}.`, { status: 500 });
  }
}

// PATH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  const id = params.id;

  try {
    await connectToDB();

    // Find the existing prompt
    const existingPrompt = await Prompt.findById(id);

    if(!existingPrompt) {
      return new Response("Existing prompt not found.", { status: 404 });
    }

    // Update the existing prompt with the new information
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(`Successfully updated the existing prompt with id: ${id}.`, { status: 200});

  } catch (error) {
    return new Response(`[PATCH error] Failed to update prompt with id: ${id}.`)
  }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  const id = params.id;

  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndDelete(id);

    return new Response(`Prompt with id: ${id} deleted successfully.`, { status: 200 });
  } catch (error) {
    return new Response(`[DELETE error] Failed to delete prompt with id: ${id}.`, { status: 500 });
  }
}