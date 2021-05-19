module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
        child_process: "empty",
        net: "empty",
        dns: "empty",
        tls: "empty",
      };
    }

    return config;
  },
};
