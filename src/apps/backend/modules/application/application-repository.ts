import { ConfigService } from 'backend/modules/config';
import { Logger } from 'backend/modules/logger';
import mongoose from 'mongoose';

let cachedConnection: mongoose.Connection | null = null;

const connectWithLogs = (uri: string): void => {
  Logger.info(`connecting to database - ${uri}`);
  mongoose
    .connect(uri)
    .then(() => Logger.info(`connected to database - ${uri}`))
    .catch((err: Error) => Logger.error(err.message));
};

const getDatabaseConnection = (): mongoose.Connection => {
  const mongoConnCaching: boolean = ConfigService.getValue(
    'mongoDb.connCaching'
  );
  const mongoURI: string = ConfigService.getValue('mongoDb.uri');

  if (mongoConnCaching) {
    // Reuse a single connection across the process
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (!cachedConnection || cachedConnection.readyState === 0) {
      connectWithLogs(mongoURI);
      cachedConnection = mongoose.connection;
    }
    return cachedConnection;
  }

  // No caching: create a fresh independent connection
  Logger.info(`connecting to database - ${mongoURI}`);
  const connection = mongoose.createConnection(mongoURI);
  connection
    .asPromise()
    .then(() => Logger.info(`connected to database - ${mongoURI}`))
    .catch((err: Error) => Logger.error(err.message));

  return connection;
};

export default function ApplicationRepository<T>(
  name: string,
  schema: mongoose.Schema<T>,
  collection?: string
): mongoose.Model<T> {
  const connection = getDatabaseConnection();

  // Avoid OverwriteModelError if called repeatedly with caching enabled
  const existingModel = connection.models[name] as
    | mongoose.Model<T>
    | undefined;
  const resolvedModel =
    existingModel ?? connection.model<T>(name, schema, collection);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  connection.syncIndexes();

  return resolvedModel;
}
