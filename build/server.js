const { build } = require("esbuild");
const chokidar = require("chokidar");
const liveServer = require("live-server");
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
        open: true,
        port: +process.env.PORT || 8080,
        root: "public",
        mount: [["/goal-tracker", "./public"]],
    });
};

runServer();
