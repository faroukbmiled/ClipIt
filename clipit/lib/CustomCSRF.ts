// file: lib/CustomCSRF.ts

import { nextCsrf } from "next-csrf";

const { csrf, setup } = nextCsrf({
  // eslint-disable-next-line no-undef
  tokenKey: "EA_",
  csrfErrorMessage: "Unauthorized",
  secret: process.env.CSRF_SECRET,
});

export { csrf, setup };
