import { ConfigMissingError } from 'backend/modules/config';
import SecretFileLoader from 'backend/modules/config/internals/secret-file-loader';
import config from 'config';
import _ from 'lodash';

export default class ConfigService {
  static getValue<T = unknown>(key: string): T {
    const secretOverride = SecretFileLoader.getValue<T>(key);
    if (!_.isNil(secretOverride)) {
      return secretOverride;
    }

    const value = config.get<T>(key);

    if (_.isNil(value)) {
      throw new ConfigMissingError(key);
    }

    return value;
  }

  public static hasValue(key: string): boolean {
    return config.has(key);
  }
}
