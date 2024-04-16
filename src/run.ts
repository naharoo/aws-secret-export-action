import config from "./config";
import { exportVariable, setOutput, setSecret } from "@actions/core";
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

const secretsManagerClient = new SecretsManagerClient({
  region: config.region,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    sessionToken: config.sessionToken,
  },
});

const { SecretString } = await secretsManagerClient.send(new GetSecretValueCommand({ SecretId: config.secretName }));

if (!SecretString) {
  throw new Error(`Secret ${config.secretName} does not have a value`);
}

const secret = JSON.parse(SecretString);

for (const [key, value] of Object.entries(secret)) {
  if (typeof value !== "string") {
    continue;
  }
  setSecret(value);
  setOutput(key, value);
  if (config.exportEnv) exportVariable(key, value);
}
