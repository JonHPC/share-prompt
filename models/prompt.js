// models/prompt.js

import { Schema, model, models } from 'mongoose';

// This is a "one to many" relationship type
// i.e. One user can create many prompts
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."]
  }
});

//Get the existing Prompt from the model OR create a new model
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;