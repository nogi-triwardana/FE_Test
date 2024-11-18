import NextAuth from "next-auth/next";
import ProviderCredentials from "next-auth/providers/credentials";
import { loginService } from "@/services";
import { AxiosError } from "axios";

const handlers = NextAuth({
  providers: [
    ProviderCredentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password', placeholder: '' },
      },
      async authorize(credentials, req) {
        try {
          const res = await loginService({
            username: credentials?.username,
            password: credentials?.password,
          });

          if (res.data && res.data.token) {
            return { token: res.data.token, id: res.data?._id };
          }
          return null;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if(user) {
        token.accessToken = user.token;
        token.user = user.user;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/dashboard',
  },
});

export { handlers as GET, handlers as POST };