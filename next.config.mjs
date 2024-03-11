/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a rule to include and transpile specific packages in node_modules
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/(@nivo|d3-interpolate)/,
      use: [defaultLoaders.babel],
    });

    // Important: return the modified config
    return config;
  },
};

// Use ES module export syntax
export default nextConfig;
