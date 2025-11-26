import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "img.icons8.com",
      "clinicallbd.obs.as-south-208.rcloud.reddotdigitalit.com",
      "clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com",
      "epharma.com.bd",
      "lh3.googleusercontent.com",
    ],
  },
  staticPageGenerationTimeout: 120,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
