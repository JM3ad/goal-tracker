const envFilePlugin = require("esbuild-envfile-plugin");
const { svgrPlugin } = require("esbuild-svgr-plugin");
const { sassPlugin } = require("esbuild-sass-plugin");

const buildOptions = {
    bundle: true,
    define: {
        "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "development"
        ),
    },
    entryPoints: ["src/app.tsx"],
    incremental: true,
    minify: true,
    outfile: "public/bundle.js",
    plugins: [
        envFilePlugin,
        svgrPlugin({ typescript: true }),
        sassPlugin({
            importMapper: (path) => path.replace(/^@src\//, ["../src/"]),
        }),
    ],
    loader: { ".svg": "text" },
};

const devBuildOptions = Object.assign({}, buildOptions);
devBuildOptions.minify = false;

module.exports.buildOptions = buildOptions;
module.exports.devBuildOptions = devBuildOptions;
