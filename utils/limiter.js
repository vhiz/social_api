import ratelimiter from "express-rate-limit";

export const limiter = (ms, max, msg) => {
  return ratelimiter({
    windowMs: ms,
    max: max,
    message: msg,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
