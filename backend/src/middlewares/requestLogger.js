const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    const status = res.statusCode
    if(status >= 400 && status < 500){
      logger.warn({ requestId: req.requestId, ip: req.ip }, logMessage);
    } else if (status >= 500){
      logger.error({ requestId: req.requestId, ip: req.ip }, logMessage);
    } else{
      logger.info({ requestId: req.requestId, ip: req.ip }, logMessage);
    }
  });

  next();
}

export default requestLogger;