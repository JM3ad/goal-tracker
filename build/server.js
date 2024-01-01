const { build } = require("esbuild");
const chokidar = require("chokidar");
const liveServer = require("alive-server");
const { devBuildOptions } = require("./build_common");

const runServer = async () => {
    const builder = await build(devBuildOptions);
    chokidar
        .watch("src/**/*.{ts,tsx}", {
            interval: 0,
        })
        .on("all", () => {
            builder.rebuild();
        });
    liveServer.start({
        open: "/goal-tracker",
        port: +process.env.PORT || 8080,
        root: "public",
        mount: [["/goal-tracker", "./public"]],
        file: "404.html",
    });
};

runServer();
