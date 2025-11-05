const config = {
  API_URL: "https://api.meridiangroup.ae/api/v1",
  //API_URL: "http://localhost:8000/api/v1",
  TURNSTILE_SITE_KEY: process.env.REACT_APP_TURNSTILE_SITE_KEY || "0x4AAAAAAB_IckdTKpb1k5o-",
  // Note: Secret Key for backend verification: 0x4AAAAAAB_IcoxIfHcHTmfqAV3-OsDcaJI
  // Use this secret key on your backend to verify the Turnstile token
};

export default config;
