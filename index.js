import Theme from "./src/components/theme/Theme";

const applyWebpackConfig = (test = /\.jsx/) => {
  return (config, options) => {
    config.module.rules.push({
      test,
      use: [options.defaultLoaders.babel]
    });
    return config;
  };
};

export { Theme, applyWebpackConfig };
