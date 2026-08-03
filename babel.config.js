module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
          alias: {
            "@": "./src",
            "@redux": "./src/redux",
            "@components": "./src/components",
            "@routes": "./src/routes",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
            "@utils": "./src/utils",
            "@constant": "./src/constant",
            "@services": "./src/services",
            "@navigation": "./src/navigation",
            "@styles": "./src/styles",
          },
        },
      ],
    ],
  };
};
