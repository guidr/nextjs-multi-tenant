import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootPath = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(rootPath, '../data/tenants.json');

export async function getTenantData(tenant: string) {
  const data = await fs.readFile(dataPath, 'utf-8');
  const tenants = JSON.parse(data);

  if (tenants[tenant]) {
    return tenants[tenant];
  }

  throw new Error(`Tenant "${tenant}" not found`);
}

