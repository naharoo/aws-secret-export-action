# AWS Secret Export Action

A GitHub Action that exports AWS Secrets Manager secret properties as workflow outputs and/or environment variables.

## Features

- Fetches secrets from AWS Secrets Manager
- Supports JSON secrets only
- Exports secret properties as GitHub Action outputs
- Optionally exports secret properties as environment variables
- Supports AWS temporary credentials (session tokens)
- Automatically masks secret values in logs

## Prerequisites

- AWS Secrets Manager secret in JSON format
- AWS credentials with appropriate permissions to access Secrets Manager

## Usage

### Basic Example

```yaml
- name: Export AWS Secret
  uses: <owner>/aws-secret-export-action@v1
  with:
    secretName: 'my-secret-name'
    accessKeyId: ${{ secrets.AWS_ACCESS_KEY_ID }}
    secretAccessKey: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Export as Environment Variables

```yaml
- name: Export AWS Secret
  uses: <owner>/aws-secret-export-action@v1
  with:
    secretName: 'my-secret-name'
    accessKeyId: ${{ secrets.AWS_ACCESS_KEY_ID }}
    secretAccessKey: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    exportEnv: 'true'
```

### With Custom Region

```yaml
- name: Export AWS Secret
  uses: <owner>/aws-secret-export-action@v1
  with:
    secretName: 'my-secret-name'
    region: 'us-west-2'
    accessKeyId: ${{ secrets.AWS_ACCESS_KEY_ID }}
    secretAccessKey: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### With Session Token

```yaml
- name: Export AWS Secret
  uses: <owner>/aws-secret-export-action@v1
  with:
    secretName: 'my-secret-name'
    accessKeyId: ${{ secrets.AWS_ACCESS_KEY_ID }}
    secretAccessKey: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    sessionToken: ${{ secrets.AWS_SESSION_TOKEN }}
```

### Complete Workflow Example

```yaml
name: Deploy Application

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Export Database Credentials
        id: db-secrets
        uses: <owner>/aws-secret-export-action@v1
        with:
          secretName: 'prod/database/credentials'
          region: 'us-east-1'
          accessKeyId: ${{ secrets.AWS_ACCESS_KEY_ID }}
          secretAccessKey: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          exportEnv: 'true'

      - name: Use Secret Values
        run: |
          echo "Database host: ${{ steps.db-secrets.outputs.DB_HOST }}"
          # or use environment variables if exportEnv is true
          echo "Database host: $DB_HOST"
```

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `secretName` | Yes | - | The name of the AWS Secrets Manager secret to export |
| `accessKeyId` | Yes | - | AWS Access Key ID |
| `secretAccessKey` | Yes | - | AWS Secret Access Key |
| `region` | No | - | AWS Region (uses default region if not specified) |
| `sessionToken` | No | - | AWS Session Token (for temporary credentials) |
| `exportEnv` | No | `false` | Whether to export secret properties as environment variables |

## Outputs

The action automatically creates outputs for each property in the JSON secret. For example, if your secret contains:

```json
{
  "DB_HOST": "database.example.com",
  "DB_PORT": "5432",
  "DB_USER": "admin",
  "DB_PASSWORD": "secret123"
}
```

The following outputs will be available:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`

Access them using: `${{ steps.<step-id>.outputs.DB_HOST }}`

## Secret Format

This action only supports JSON secrets. Your AWS Secrets Manager secret must be in the following format:

```json
{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```

**Note:** Only string values are exported. Non-string values are skipped.

## IAM Permissions

The AWS credentials used must have the following IAM permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "arn:aws:secretsmanager:REGION:ACCOUNT_ID:secret:SECRET_NAME*"
    }
  ]
}
```

## Development

### Prerequisites

- Node.js 20.11 or higher
- pnpm 8.6.12 or higher

### Setup

```bash
# Install dependencies
pnpm install

# Format code
pnpm format

# Lint code
pnpm lint

# Build the action
pnpm build

# Run all checks and build
pnpm polish
```

### Project Structure

```
.
├── src/
│   ├── index.ts      # Entry point
│   ├── run.ts        # Main logic
│   ├── config.ts     # Configuration and validation
│   └── utils.ts      # Helper functions
├── dist/             # Compiled output
├── action.yml        # Action metadata
└── package.json      # Dependencies and scripts
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please [open an issue](../../issues) on GitHub.
