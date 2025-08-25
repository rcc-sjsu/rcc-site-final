//fetches posts from instagram API
//need to set up instagram access token in .env file
//when deploying to register app in Meta Developer portal
//and go through app review
//100 api rate limit per hour
//login by using Oauth(uer login)

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN; //access token for instagram API

    if (!instagramAccessToken) {
      return NextResponse.json({ error: 'No instaram access token' }, { status: 500 });
    }

    //fetch posts from ig using basic display api
    //need to make sure posts are refreshed when new posts are added
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${instagramAccessToken}`,
      { next: { revalidate: 3600 } } // keep data for 1 hour to reduce api calls
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    //return Instagram posts
    return NextResponse.json({ posts: data.data });
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}
