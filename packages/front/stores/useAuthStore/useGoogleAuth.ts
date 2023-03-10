import { $auth, $loading, AuthStore } from "@stores";
import { tools } from "@tools";

export function useGoogleAuth(): AuthStore {
  function requestCode() {
    const config = useRuntimeConfig();
    const route = useRoute();
    const client = google.accounts.oauth2.initCodeClient({
      client_id: config.public.vendor.google.clientId,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        // "https://www.googleapis.com/auth/youtube.readonly",
        // "https://www.googleapis.com/auth/youtubepartner-channel-audit",
      ].join(" "),
      ux_mode: "redirect",
      redirect_uri: config.public.front.clientBase + route.path,
      state: tools.random.string(),
    });
    client.requestCode();
  }

  function login() {
    useHead({
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
          async: false,
          defer: false,
        },
      ],
    });
    $loading().show();
    const interval = setInterval(() => {
      if (typeof google !== "undefined") {
        clearInterval(interval);
        requestCode();
        $loading().hide();
      }
    }, 500);
  }

  async function fetchToken() {
    try {
      const route = useRoute();
      const router = useRouter();
      const config = useRuntimeConfig();
      const response = await axios("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          code: route.query.code,
          client_id: config.public.vendor.google.clientId,
          client_secret: config.public.vendor.google.clientSecret,
          redirect_uri: config.public.front.clientBase + route.path,
          grant_type: "authorization_code",
        },
      });
      router.replace({ query: {} });
      const { access_token, id_token, refresh_token } = response.data;
      return {
        access_token,
        id_token,
        refresh_token,
      };
    } catch {
      return null;
    }
  }

  async function refreshToken() {
    try {
      const config = useRuntimeConfig();
      const refresh_token = $auth().token.refresh_token;
      const response = await axios("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          client_id: config.public.vendor.google.clientId,
          client_secret: config.public.vendor.google.clientSecret,
          refresh_token,
          grant_type: "refresh_token",
        },
      });

      const { access_token, id_token } = response.data;
      $auth().token.id_token = id_token;
      $auth().token.access_token = access_token;
      return {
        access_token,
        id_token,
        refresh_token,
      };
    } catch {
      return null;
    }
  }

  async function fetchProfile(access_token: string) {
    try {
      if (!access_token) {
        return null;
      }
      const response = await axios(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            access_token,
          },
        }
      );
      const { email: social_id, name, email, picture } = response.data;
      return { social_id, name, email, picture };
    } catch {
      return null;
    }
  }

  return {
    login,
    fetchToken,
    refreshToken,
    fetchProfile,
  };
}
