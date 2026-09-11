// Small Express server used to serve the demo application locally.
// Use Express to serve the local demo application used by the Playwright tests.
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static files in the `app` directory.
app.use(express.static(path.join(__dirname, 'app')));

// Start the local server on port 3000 so the tests have an application to exercise.
app.listen(3000);
console.log('working on 3000');