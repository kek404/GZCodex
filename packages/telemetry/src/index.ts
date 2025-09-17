import { trace, context, SpanStatusCode, Tracer } from '@opentelemetry/api';

export interface TracerConfig {
  serviceName: string;
}

export function createTracer(config: TracerConfig): Tracer {
  const tracer = trace.getTracer(config.serviceName);
  return tracer;
}

export async function withSpan<T>(tracer: Tracer, name: string, fn: () => Promise<T>): Promise<T> {
  const span = tracer.startSpan(name);
  try {
    const result = await context.with(trace.setSpan(context.active(), span), fn);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: SpanStatusCode.ERROR });
    throw error;
  } finally {
    span.end();
  }
}
