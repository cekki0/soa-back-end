import { ROOT_CONTEXT, context, propagation, trace } from "@opentelemetry/api";
import { NextFunction, Request, Response } from "express";

export const createSpanMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const remoteCtx = propagation.extract(ROOT_CONTEXT, req.headers);
  const tracer = trace.getTracer("Encounters");
  const span = tracer.startSpan(req.path, {}, remoteCtx);
  span.setAttribute("http.method", req.method);
  span.setAttribute("http.url", req.url);

  context.with(trace.setSpan(remoteCtx, span), () => {
    next();

    res.on("finish", () => {
      span.end();
    });
  });
};
