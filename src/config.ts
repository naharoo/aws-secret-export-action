import { isNotBlank } from "./utils";
import { getInput } from "@actions/core";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const configSchema = z.object({
  secretName: z.string(),
  exportEnv: z.ostring().transform(value => value === "true"),
  region: z.ostring().transform(value => (isNotBlank(value) ? value : undefined)),
  accessKeyId: z.string(),
  secretAccessKey: z.string(),
  sessionToken: z.ostring().transform(value => (isNotBlank(value) ? value : undefined)),
});

function getActionInputValue(name: string) {
  const inputValue = getInput(name);
  return inputValue.length ? inputValue : undefined;
}

function parseConfig() {
  return configSchema.parse({
    secretName: getActionInputValue("secretName"),
    exportEnv: getActionInputValue("exportEnv"),
    region: getActionInputValue("region"),
    accessKeyId: getActionInputValue("accessKeyId"),
    secretAccessKey: getActionInputValue("secretAccessKey"),
    sessionToken: getActionInputValue("sessionToken"),
  });
}

let config: z.infer<typeof configSchema>;

try {
  config = parseConfig();
} catch (err) {
  if (err instanceof z.ZodError) {
    throw fromZodError(err);
  }
  throw err;
}

export default config;
