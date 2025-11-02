# Logging

This document outlines the logging strategy for both backend and frontend applications, utilizing Datadog for log management and monitoring.

To view the logs, navigate to the [Datadog Logs Explorer](https://us5.datadoghq.com/logs).

## Backend Logging (Node.js/TypeScript)

Import the unified wrapper and log at the desired level:

```typescript
import { Logger } from 'backend/modules/logger';

// Example usage
const itemId = 123;
const payload = { key: "value" };

Logger.info("Started background job");
Logger.debug(`Payload received: ${JSON.stringify(payload)}`);
Logger.error(`Failed to process item ${itemId}`);
```

---

## Frontend Logging (JavaScript/TypeScript)

| Tool           | Purpose                               | Docs                                                                              |
|----------------|---------------------------------------|-----------------------------------------------------------------------------------|
| Datadog Logger | Captures console & custom logs.       | [JS log collection ↗](https://docs.datadoghq.com/logs/log_collection/javascript/) |
| Datadog RUM    | Real-user monitoring & custom events. | [Browser RUM ↗](https://docs.datadoghq.com/real_user_monitoring/browser/)         |

### Usage Notes

* Both `console.*` and any custom logger integrations are forwarded to Datadog when logging is enabled.
* RUM auto-collects page views, errors, and performance metrics. Emit custom events for business-specific insights.

### Usage Example

```typescript jsx
import React, { useEffect } from 'react';
import { Logger } from './utils/logger';

Logger.init();

export default function App(): React.ReactElement {
  Logger.info("This is a logger info message");
  console.log("This is a console log"); // can also be captured by Datadog

  return (
    <div>
      <h1>Sample App</h1>
      {/* Your components go here */}
    </div>
  );
}
```

---

## Configuration

Configure Datadog integration via the configuration files:

- `datadog.api_key` - Datadog client token
- `datadog.app_name` - Application name for Datadog
- `logger.transports` - Set to include 'datadog' to enable Datadog logging

See [Configuration](configuration.md) for more details on managing these settings.
