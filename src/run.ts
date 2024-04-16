import config from "./config";
import { info, setOutput } from "@actions/core";

const greeting = `Hello, ${config.name}!`;

setOutput("greeting", greeting);
info(greeting);
