import { performance } from 'node:perf_hooks';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  scope: string;
  message: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

export interface Logger {
  log: (entry: Omit<LogEntry, 'timestamp'>) => void;
  debug: (message: string, data?: Record<string, unknown>) => void;
  info: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, data?: Record<string, unknown>) => void;
  scoped: (childScope: string) => Logger;
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

export interface LoggerOptions {
  scope: string;
  level?: LogLevel;
  stream?: (line: string) => void;
}

export function createLogger({
  scope,
  level = 'info',
  stream = console.log
}: LoggerOptions): Logger {
  const minPriority = LEVEL_PRIORITY[level];

  const logImpl = (entry: Omit<LogEntry, 'timestamp'>) => {
    if (LEVEL_PRIORITY[entry.level] < minPriority) {
      return;
    }

    const payload: LogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };

    stream(JSON.stringify(payload));
  };

  const buildLogger = (currentScope: string): Logger => {
    const scopedLog = (levelName: LogLevel) =>
      (message: string, data?: Record<string, unknown>) =>
        logImpl({ level: levelName, scope: currentScope, message, data });

    return {
      log: logImpl,
      debug: scopedLog('debug'),
      info: scopedLog('info'),
      warn: scopedLog('warn'),
      error: scopedLog('error'),
      scoped: (childScope: string) => buildLogger(`${currentScope}:${childScope}`)
    };
  };

  return buildLogger(scope);
}

export function time<T>(logger: Logger, message: string, fn: () => Promise<T>): Promise<T>;
export function time<T>(logger: Logger, message: string, fn: () => T): T;
export function time<T>(logger: Logger, message: string, fn: () => T | Promise<T>): T | Promise<T> {
  const start = performance.now();
  const finish = (result: T) => {
    const durationMs = Math.round(performance.now() - start);
    logger.debug(message, { durationMs });
    return result;
  };

  try {
    const maybePromise = fn();
    if (maybePromise instanceof Promise) {
      return maybePromise.then(finish);
    }
    return finish(maybePromise);
  } catch (error) {
    logger.error(`${message} failed`, { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}
