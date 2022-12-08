import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      body: new URLSearchParams({
        client_id: process.env.SPOTIFY_ID as string,
        client_secret: process.env.SPOTIFY_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshToken = await response.json()

    if (!response.ok) {
      throw refreshToken
    }

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: refreshToken.expires_in,
      refreshToken: token.refreshToken,
    }
  } catch (error) {
    throw error
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: {
        params: {
          scope:
            "user-read-private user-read-email user-read-playback-state user-top-read user-read-recently-played user-follow-read user-library-read",
        },
      },
    }),
  ],
  secret: "spotify",

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: "spotify",
  },
  pages: {},
  callbacks: {
    async signIn() {
      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user: user,
        }
      }

      // if (Date.now() < token.accessTokenExpires) {
      //   return token
      // }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      session.user = token.user;
      return session
    },
  },
  events: {},
  debug: false,
})
