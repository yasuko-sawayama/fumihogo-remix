import { enc, HmacSHA1 } from "crypto-js";
import OAuth from "oauth-1.0a";
import type { User } from "~/services/auth.server";

// These are cloudflare secret key
declare const TWITTER_CONSUMER_KEY: string;
declare const TWITTER_CONSUMER_SECRET: string;

export const clientID = TWITTER_CONSUMER_KEY;
export const clientSecret = TWITTER_CONSUMER_SECRET;
if (!clientID || !clientSecret) {
  throw new Error(
    "TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET must be provided"
  );
}

const usersMeUrl = "https://api.twitter.com/2/users/me";

export const oauth = new OAuth({
  consumer: { key: clientID, secret: clientSecret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return HmacSHA1(baseString, key).toString(enc.Base64);
  },
});

type OAuthToken = {
  key: string;
  secret: string;
};

export const myProfile = async (oauthToken: OAuthToken) => {
  const params = {
    "user.fields": "profile_image_url,username",
  };
  const url = new URL(usersMeUrl);
  url.search = new URLSearchParams(params).toString();
  const request = {
    url: url.toString(),
    method: "GET",
  };

  const response = await fetch(request.url, {
    headers: {
      ...oauth.toHeader(oauth.authorize(request, oauthToken)),
      "Content-Type": "application/json",
    },
  });

  const { data } = (await response.json()) as { data: User };
  return data;
};
