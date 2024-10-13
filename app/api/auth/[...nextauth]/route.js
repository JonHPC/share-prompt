// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      // Get the data about the logged in user, store the user id from MongoDB to the session
      const sessionUser = await User.findOne({
        email: session.user.email
      })
  
      // Update the session id, making sure we always know which user is currently online
      session.user.id = sessionUser._id.toString();
  
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
  
        // Check if a user already exists
        const userExists = await User.findOne({
          email: profile.email
        });
  
        // If not, create a new user document and save to the DB
        if(!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          });
        }
  
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST };