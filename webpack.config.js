const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const pkg = require("./package.json");

const getConfig = (target) => {
    return {
        entry: "./lib/index.ts",
        mode: "production",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json"],
            fallback: target === "web" ? {
                crypto: false,
                stream: false,
                buffer: false,
            } : {
                "stream": require.resolve("stream-browserify"),
                "buffer": require.resolve("buffer"),
            },
        },
        output: {
            filename: (target === "web" ? pkg.browser : pkg.main).replace(/.*\//g, ""),
            path: path.resolve(__dirname, "dist"),
            library: "mail-proton-api",
            libraryTarget: "umd",
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                }),
            ],
        },
        target: target === "web" ? "web" : "node",
        externals: target === "web" ? undefined : [nodeExternals()],
        devtool: "source-map",
    };
};

module.exports = () => {
    return [
        getConfig("web"),
        getConfig("node"),
    ];
};
