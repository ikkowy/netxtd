import express from 'express';

const app = express();

function isSystemPath(path: string): boolean {
  return path.startsWith('/_/');
}

function getTenantNameFromPath(path: string): string | undefined {
  const tenantNameRegex = /[A-Za-z0-9]+(-[A-Za-z0-9]+)*/;
  const match = path.match(tenantNameRegex);
  return match ? match[0] : undefined;
}

app.use((req, res, next) => {
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
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
