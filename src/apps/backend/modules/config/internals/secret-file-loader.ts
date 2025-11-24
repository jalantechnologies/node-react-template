import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';
import _ from 'lodash';

type SecretFileMap = Record<string, unknown>;

export default class SecretFileLoader {
  private static readonly defaultConfigPath = path.resolve(
    process.cwd(),
    'config/custom-environment-variables.yml'
  );

  private static readonly fallbackSecretBasePath = '/opt/app/secrets';

  private static fileMap: SecretFileMap | null = null;

  private static hasLoaded = false;

  static getValue<T = string>(key: string): T | undefined {
    this.loadConfig();

    if (_.isNil(this.fileMap)) {
      return undefined;
    }

    const secretPath = _.get(this.fileMap, key);

    if (!secretPath || !_.isString(secretPath)) {
      return undefined;
    }

    return this.readSecret(secretPath) as T;
  }

  static reset(): void {
    this.fileMap = null;
    this.hasLoaded = false;
  }

  private static getConfigPaths(): string[] {
    const envValue = process.env.CONFIG_SECRET_FILES_PATHS;

    if (_.isNil(envValue)) {
      return [this.defaultConfigPath];
    }

    return envValue
      .split(path.delimiter)
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) =>
        path.isAbsolute(value) ? value : path.resolve(process.cwd(), value)
      );
  }

  private static getSecretBasePath(): string {
    return process.env.CONFIG_SECRET_BASE_PATH ?? this.fallbackSecretBasePath;
  }

  private static loadConfig(): void {
    if (this.hasLoaded) {
      return;
    }

    this.fileMap = {};

    this.getConfigPaths()
      .filter((configPath) => fs.existsSync(configPath))
      .forEach((configPath) => {
        const fileContents = fs.readFileSync(configPath, 'utf8');

        if (_.isEmpty(fileContents)) {
          return;
        }

        const parsed = yaml.load(fileContents) as SecretFileMap | undefined;

        if (!_.isPlainObject(parsed)) {
          return;
        }

        this.fileMap = _.merge(this.fileMap, parsed);
      });

    this.hasLoaded = true;
  }

  private static resolveSecretPath(secretPath: string): string {
    if (path.isAbsolute(secretPath)) {
      return secretPath;
    }

    return path.resolve(this.getSecretBasePath(), secretPath);
  }

  private static readSecret(secretPath: string): string | undefined {
    const absolutePath = this.resolveSecretPath(secretPath);

    if (!fs.existsSync(absolutePath)) {
      return undefined;
    }

    return fs.readFileSync(absolutePath, 'utf8').trim();
  }
}
