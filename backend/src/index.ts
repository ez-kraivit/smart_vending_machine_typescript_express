import ExpressServer from "./utils/ExpressServer/index";

ExpressServer.connect();
ExpressServer.start();

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});