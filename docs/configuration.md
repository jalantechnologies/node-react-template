# Configuration

The module uses [config](https://www.npmjs.com/package/config) for loading configuration entries.

## Configuration Files

In the `config` directory:

- **`custom-environment-variables.yml`** – Overrides values using environment variables. This takes precedence over all other configuration files.
- **`local.yml`** – Create this file for local configuration overrides (ignored by VCS).
- **`local-{env}.yml`** – Overrides only specific `env` environment (e.g., `local-development.yml`).
- **`development.yml`** – Configuration for the development environment (default).
- **`testing.yml`** – Configuration for the testing environment (`NODE_CONFIG_ENV` must be set to `testing`).
- **`staging.yml`** – Configuration for the staging environment (`NODE_CONFIG_ENV` must be set to `staging`).
- **`production.yml`** – Configuration for the production environment (`NODE_CONFIG_ENV` must be set to `production`).
- **`default.yml`** – Stores **constant values only** that remain unchanged across deployments.

## Environment Selection

The configuration schema is loaded based on the `NODE_CONFIG_ENV` value:
```bash
NODE_CONFIG_ENV=<environment_name>
```

## `default.yml` Guidelines

The `default.yml` config file lists all available entries which the system uses. When creating a new config entry:

- If the configuration value **varies across deployments**, set it to `undefined` in `default.yml` and define it in the respective environment-specific file.
- If the configuration value **remains the same across all deployments**, define it directly in `default.yml`.

## Local Configuration

`local*` files allow you to manually provide config during development and are set to be ignored by VCS. Any environment can be overridden locally via:

- `local.yml` – Overrides everything.
- `local-{env}.yml` – Overrides only specific `env` environment.

Read more about the order in which config entries are loaded [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order).

## `.env` Support

For injecting environment variables, you can add a `.env` file in the application root directory.

## UI Configuration

The config module can also be used to inject configuration values into frontend builds. The `public` key accepts key-value pairs which will all get injected into frontend builds.

- Define the config entry in the appropriate config file under `public`, for example: `public.myServiceKey`.
  > **Note:** Deployment does not support injecting config values using environment variables, so avoid using `custom-environment-variables.yml` here.
- Use the config value via `Config.getConfigValue('myServiceKey')`.
- For scripts directly using the config from `window`, you can access the config via `window.Config.myServiceKey`. For type safety, add the entry in `src/apps/frontend/types/globals.d.ts`.

## Configuration Precedence

1. **Custom Environment Variables** (highest priority)
2. **Local Configuration Files** (`local.yml`, `local-{env}.yml`)
3. **Environment-Specific Configuration Files** (e.g., `development.yml`, `production.yml`)
4. **`default.yml`** (lowest priority, used as fallback)
