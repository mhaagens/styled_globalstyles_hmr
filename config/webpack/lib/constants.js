import { join } from "path";

const PRODUCTION = process.env.NODE_ENV === "production";
const SRC_DIR = join(__dirname, "../../../src");
const BUILD_DIR = join(__dirname, "../../../build");

export default {
  PRODUCTION,
  SRC_DIR,
  BUILD_DIR
};
