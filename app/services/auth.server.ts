import { enc, HmacSHA1 } from "crypto-js";
import OAuth from "oauth-1.0a";
import { Authenticator } from "remix-auth";
import { TwitterStrategy } from "remix-auth-twitter";
import { sessionStorage } from "~/services/session.server";

export type User = {
  id: number;
  screen_name: string;
  name: string;
  profile_image_url: string;
  email?: string;
};

// These are cloudflare secret key
declare const TWITTER_CONSUMER_KEY: string;
declare const TWITTER_CONSUMER_SECRET: string;

const clientID = TWITTER_CONSUMER_KEY;
const clientSecret = TWITTER_CONSUMER_SECRET;
if (!clientID || !clientSecret) {
  throw new Error(
    "TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET must be provided"
  );
}

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
      const oauth = new OAuth({
        consumer: { key: clientID, secret: clientSecret },
        signature_method: "HMAC-SHA1",
        hash_function(baseString, key) {
          return HmacSHA1(baseString, key).toString(enc.Base64);
        },
      });

      const oauthToken = {
        key: accessToken,
        secret: accessTokenSecret,
      };

      const usersMeUrl = new URL("https://api.twitter.com/2/users/me");
      const params = {
        "user.fields": "profile_image_url",
      };
      usersMeUrl.search = new URLSearchParams(params).toString();
      const request = {
        url: usersMeUrl.toString(),
        method: "GET",
      };
      const response = await fetch(request.url, {
        headers: {
          ...oauth.toHeader(oauth.authorize(request, oauthToken)),
          "Content-Type": "application/json",
        },
      });

      const { data } = (await response.json()) as { data: User };

      return {
        id: data.id,
        screen_name: data.screen_name,
        name: data.name,
        profile_image_url: data.profile_image_url,
      };
    }
  ),
  // each strategy a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "twitter"
);
