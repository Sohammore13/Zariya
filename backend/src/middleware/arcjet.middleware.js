// Arcjet protection removed for deployment (package not installed)
// To re-enable: npm install @arcjet/node @arcjet/inspect and restore this file

export const arcjetProtection = (req, res, next) => {
  next();
};
