import NextAuth, { Session } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      body: new URLSearchParams({
        client_id: process.env.SPOTIFY_ID as string,
        client_secret: process.env.SPOTIFY_SECRET as string,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: refreshToken.expires_in,
      refreshToken: token.refreshToken,
    };
  } catch (error) {
    throw error;
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: {
        params: {
          scope:
            'ugc-image-upload user-read-private user-read-email user-modify-playback-state user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played user-follow-read user-library-read user-library-modify app-remote-control streaming',
        },
      },
    }),
  ],
  secret: 'spotify',

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: 'spotify',
  },
  pages: {},
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user: user,
        };
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      session.user = token.user;
      return session;
    },
  },
  events: {},
  debug: false,
};

//@ts-ignore
export default NextAuth(authOptions);
