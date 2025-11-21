import fs from 'fs';
import path from 'path';

import { ConfigMissingError } from 'backend/modules/config/types';
import yaml from 'js-yaml';
import _ from 'lodash';


type SecretFileMap = Record<string, unknown>;

export default class SecretFileLoader {
  private static readonly defaultConfigPath = path.resolve(
    process.cwd(),
    'config/secret-files.yml'
  );

  private static fileMap: SecretFileMap | null = null;

  private static hasLoaded = false;

  static getValue(key: string): string | undefined {
    this.loadConfig();

    if (_.isNil(this.fileMap)) {
      return undefined;
    }

    const secretPath = _.get(this.fileMap, key);

    if (!secretPath || !_.isString(secretPath)) {
      return undefined;
    }

    return this.readSecret(secretPath, key);
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

  private static readSecret(secretPath: string, key: string): string {
    const absolutePath = path.isAbsolute(secretPath)
      ? secretPath
      : path.resolve(process.cwd(), secretPath);

    if (!fs.existsSync(absolutePath)) {
      throw new ConfigMissingError(
        `Secret file for key ${key} (${absolutePath})`
      );
    }

    return fs.readFileSync(absolutePath, 'utf8').trim();
  }
}
