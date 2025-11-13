import { strict as assert } from 'assert';
import fs from 'fs';

import { loadEnvVars } from 'backend/modules/config';
import sinon from 'sinon';


const ENV_KEYS = [
  'JWT_TOKEN',
  'DD_API_KEY',
  'DD_APP_NAME',
  'INSPECTLET_KEY',
  'DEFAULT_EMAIL',
  'DEFAULT_EMAIL_NAME',
  'FORGOT_PASSWORD_MAIL_TEMPLATE_ID',
  'MONGODB_URI',
  'OPENAI_API_KEY',
  'DEFAULT_OTP',
  'DEFAULT_PHONE_NUMBER',
  'ROLLBAR_ENV',
  'ROLLBAR_ACCESS_TOKEN',
  'SENDGRID_API_KEY',
  'PORT',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_MESSAGING_SERVICE_SID',
  'WEB_APP_HOST',
];

describe('initSecretsFromFiles', () => {
  let existsSyncStub: sinon.SinonStub;
  let readFileSyncStub: sinon.SinonStub;

  beforeEach(() => {
    existsSyncStub = sinon.stub(fs, 'existsSync');
    readFileSyncStub = sinon.stub(fs, 'readFileSync');

    ENV_KEYS.forEach((key) => {
      delete process.env[key];
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('sets environment variables from existing secret files', () => {
    existsSyncStub.callsFake((p: fs.PathLike) => {
      const path = p.toString();
      if (path.endsWith('/jwt_token')) return true;
      if (path.endsWith('/openai_api_key')) return true;
      return false;
    });

    readFileSyncStub.callsFake((p: fs.PathLike) => {
      const path = p.toString();
      if (path.endsWith('/jwt_token')) return 'jwt-secret-value\n';
      if (path.endsWith('/openai_api_key')) return 'openai-secret';
      throw new Error(`Unexpected path: ${path}`);
    });

    loadEnvVars();

    assert.equal(process.env.JWT_TOKEN, 'jwt-secret-value');
    assert.equal(process.env.OPENAI_API_KEY, 'openai-secret');
    assert.equal(process.env.MONGODB_URI, undefined);
  });

  it('does not set env vars when files do not exist', () => {
    existsSyncStub.returns(false);

    loadEnvVars();

    sinon.assert.notCalled(readFileSyncStub);
    ENV_KEYS.forEach((key) => {
      assert.equal(process.env[key], undefined);
    });
  });

  it('overwrites existing env var when file exists', () => {
    process.env.JWT_TOKEN = 'old-value';

    existsSyncStub.callsFake((p: fs.PathLike) => {
      const path = p.toString();
      return path.endsWith('/jwt_token');
    });

    readFileSyncStub.returns('new-secret');

    loadEnvVars();

    assert.equal(process.env.JWT_TOKEN, 'new-secret');
  });
});
