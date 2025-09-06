import { Request, Response, NextFunction } from 'express';

export function tenantRouteMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path;

  if (isSystemPath(path)) {
    console.log('System path accessed:', path);
    return next();
  }

  const tenantName = getTenantNameFromPath(path);
  if (tenantName) {
    console.log('Tenant path accessed:', path);
    console.log('Tenant name:', tenantName);
    return next();
  }

  res.status(404).send('Not Found');
}


function isSystemPath(path: string): boolean {
  return path.startsWith('/_/');
}

function getTenantNameFromPath(path: string): string | undefined {
  const tenantNameRegex = /[A-Za-z0-9]+(-[A-Za-z0-9]+)*/;
  const match = path.match(tenantNameRegex);
  return match ? match[0] : undefined;
}
