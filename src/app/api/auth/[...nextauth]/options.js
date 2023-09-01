import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FaceBookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import FormData from "form-data";
import { isTokenExpired } from "@/utils";

const base_url = process.env.NEXT_PUBLIC_API_BASS_URL;

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FaceBookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",

      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("inside credentials provider : ", email, password);

        const url = `${base_url}/api/v1/user/signin`;
        let data = new FormData();
        data.append("email", email);
        data.append("password", password);

        console.log(data);

        try {
          const response = await axios.post(url, data);
          const user = response;
          console.log("user : ", user.data.result);
          // if (user) {
          //   return user;
          // } else {
          //   return null;
          // }
          return user.data.result;
        } catch (error) {
          console.log(error);
          return error.response.data;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      console.log(
        "inside signIn callback cred : ",
        user,
        account,
        profile,
        credentials
      );
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      // add a access_token to the token right after signin

      //credential provider settings
      if (account?.provider === "credentials") {
        console.log("inside jwt callback : ", user);

        const { access_token, refresh_token } = user;
        token.accessToken = access_token;
        token.refreshToken = refresh_token;

        console.log("access token : ", token.accessToken);

       
      }

      //google provider settings
      if (account?.provider === "google") {
        const { id_token } = account;

        const url = `${base_url}/api/v1/user/social_auth`;
        let data = new FormData();
        data.append("id_token", id_token);

        try {
          //post idToken to backend
          const response = await axios.post(url, data);
          console.log(
            "access token response : ",
            response.data.result.access_token
          );
          const accessToken = response.data.result.access_token;
          token.accessToken = accessToken;
          console.log(
            "refresh token response : ",
            response.data.result.refresh_token
          );
          const refreshToken = response.data.result.refresh_token;
          token.refreshToken = refreshToken;
        } catch (error) {
          console.log(error);
          token.accessToken = error;
        }
       
      }

      //get new access token from refresh token

       if (isTokenExpired(token.accessToken)) {
         const refreshToken = token.refreshToken;
         const url = `${base_url}/api/v1/user/refresh_token`;

         try {
           console.log("passing header", `Bearer ${refreshToken}`);

           const respose = await axios.post(url, null, {
             headers: {
               Authorization: `Bearer ${refreshToken}`,
             },
           });

           console.log("new access token : ", respose.data.result.access_token);
           const accessToken = respose.data.result.access_token;
           token.accessToken = accessToken;
         } catch (error) {
           console.log(error);
           token.accessToken = null;
         }
       }

      return { ...token, ...user, ...account, ...profile };
    },
    async session({ session, token, account, profile }) {
      // Add property to session, like an access_token from a provider.

      return { ...session, ...token, ...account, ...profile };
    },
  },
};
