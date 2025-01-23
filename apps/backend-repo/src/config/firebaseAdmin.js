import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

const serviceAccount = JSON.parse(
    fs.readFileSync(path.resolve('./serviceAccount.json'), 'utf8')
);

initializeApp({
    credential: cert(serviceAccount),
});

export { getAuth };
