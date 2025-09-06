import { Request, Response, NextFunction } from 'express';

export function tenantRouteMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path;

  if (req.path.startsWith('/_/')) {
    req.url = req.url.replace('/_/', '/');
    console.log('System path accessed:', path);
    return next();
  }

  const tenantName = getTenantNameFromPath(path);
  if (tenantName) {
    req.url = req.url.replace(`/${tenantName}/`, '/');
    console.log('Tenant path accessed:', path);
    console.log('Tenant name:', tenantName);
    return next();
  }

  res.status(404).send('Not Found');
}

function getTenantNameFromPath(path: string): string | undefined {
  const tenantNameRegex = /\/([A-Za-z0-9]+(-[A-Za-z0-9]+)*)\//;
  const match = path.match(tenantNameRegex);
  return match ? match[1] : undefined;
}
