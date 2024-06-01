// @ts-nocheck
import { BatchSpanProcessor } from "@opentelemetry/tracing";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { W3CTraceContextPropagator } from "@opentelemetry/core";

const options = {
  tags: [],
  endpoint: `http://localhost:14268/api/traces`,
};

export const init = (serviceName = "Encounters - Nodejs") => {
  const exporter = new JaegerExporter(options);

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "Encounters - Nodejs",
    }),
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register({ propagator: new W3CTraceContextPropagator() });

  console.log("tracing initialized");

  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  });

  const tracer = provider.getTracer(serviceName);
  return { tracer };
};
