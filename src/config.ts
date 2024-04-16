import { getInput } from "@actions/core";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const configSchema = z.object({
  name: z.string(),
});

function getActionInputValue(name: string) {
  const inputValue = getInput(name);
  return inputValue.length ? inputValue : undefined;
}

function parseConfig() {
  return configSchema.parse({
    name: getActionInputValue("name"),
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
