import fs from 'fs';
import os from 'os';
import path from 'path';

import { ConfigService } from 'backend/modules/config';
import SecretFileLoader from 'backend/modules/config/internals/secret-file-loader';
import { assert } from 'chai';

const restoreEnvVar = (key: string, value: string | undefined): void => {
  if (typeof value === 'undefined') {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
};

describe('ConfigService', () => {
  describe('getValue', () => {
    it('should return correct env variable value', () => {
      const boolValue = ConfigService.getValue('test.boolTestKey');
      assert.equal(boolValue, true);

      const numberValue = ConfigService.getValue('test.numberTestKey');
      assert.equal(numberValue, 1);

      const stringValue = ConfigService.getValue('test.stringTestKey');
      assert.equal(stringValue, 'string');
    });

    it('should throw MissingKeyError if key is not found in config', () => {
      const missingKey = 'missingKey';

      assert.throws(
        () => ConfigService.getValue(missingKey),
        `Configuration property "${missingKey}" is not defined`
      );

      assert.throws(
        () => ConfigService.getValue(missingKey),
        `Configuration property "${missingKey}" is not defined`
      );

      assert.throws(
        () => ConfigService.getValue(missingKey),
        `Configuration property "${missingKey}" is not defined`
      );
    });

    it('should source values from secret files when configured', () => {
      const secretFileName = 'test_secret_value';
      const initialSecretFilesPath = process.env.CONFIG_SECRET_FILES_PATHS;
      const initialSecretBasePath = process.env.CONFIG_SECRET_BASE_PATH;
      let tempDir: string | undefined;

      try {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'config-secret-'));
        const secretBasePath = path.join(tempDir, 'secrets');
        fs.mkdirSync(secretBasePath, { recursive: true });
        fs.writeFileSync(
          path.join(secretBasePath, secretFileName),
          'value-from-secret-file'
        );

        const customEnvFilePath = path.join(tempDir, 'custom-env.yml');
        fs.writeFileSync(
          customEnvFilePath,
          `test:\n  stringTestKey: ${secretFileName}\n`
        );

        process.env.CONFIG_SECRET_FILES_PATHS = customEnvFilePath;
        process.env.CONFIG_SECRET_BASE_PATH = secretBasePath;

        SecretFileLoader.reset();

        const value = ConfigService.getValue<string>('test.stringTestKey');

        assert.equal(value, 'value-from-secret-file');
      } finally {
        SecretFileLoader.reset();
        restoreEnvVar('CONFIG_SECRET_FILES_PATHS', initialSecretFilesPath);
        restoreEnvVar('CONFIG_SECRET_BASE_PATH', initialSecretBasePath);

        if (tempDir && fs.existsSync(tempDir)) {
          fs.rmSync(tempDir, { recursive: true, force: true });
        }
      }
    });
  });

  describe('hasValue', () => {
    it('should return true if configuration value is defined', () => {
      assert.equal(ConfigService.hasValue('test.numberTestKey'), true);
    });

    it('should return false if configuration value is not defined', () => {
      assert.equal(ConfigService.hasValue('test.someRandomConfig'), false);
    });
  });
});
