import { Authenticator } from "remix-auth";
import { TwitterStrategy } from "remix-auth-twitter";
import { sessionStorage } from "~/services/session.server";
import { clientID, clientSecret } from "~/services/twitter.server";
import { myProfile } from "./twitter.server";

export type User = {
  id: number;
  screen_name: string;
  name: string;
  profile_image_url: string;
  email?: string;
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new TwitterStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "https://localhost:8787/login/callback",
      // In order to get user's email address, you need to configure your app permission.
      // See https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-verify_credentials.
      // includeEmail: true, // Optional parameter. Default: false.
    },
    // Define what to do when the user is authenticated
    async ({ accessToken, accessTokenSecret }) => {
      // Return a user object to store in sessionStorage.
      // You can also throw Error to reject the login
      // Here we let everyone login, and filter fields to store in session

      // remix-twitter-authではAPI Ver1.1のみ対応のため、ここでprofile取得
      // twitter-api-v2はworkers上では動かないので自力で

      const oauthToken = {
        key: accessToken,
        secret: accessTokenSecret,
      };

      const profile = await myProfile(oauthToken);

      return {
        id: profile.id,
        screen_name: profile.screen_name,
        name: profile.name,
        profile_image_url: profile.profile_image_url,
      };
    }
  ),
  // each strategy a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "twitter"
);
