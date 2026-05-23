import pino from 'pino';

const logger = pino({
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: "url-shortener",
  },
});

export default logger;