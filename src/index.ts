import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {db} from './db';
import {DrizzleVisits, visits} from './db/schema';
import {VisitRequestBody} from './definitions';
import {and, count, desc, eq} from 'drizzle-orm';

dotenv.config();
const port: number | string = process.env.PORT || 5055;

const app: Express = express();
app.use(
  cors({
    origin: [`http://localhost:${port}`, 'https://*.syntaxpunk.com'],
  })
);
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to simplistics!');
});

app.post(
  '/track',
  async (req: Request<any, any, VisitRequestBody>, res: Response) => {
    const jsonPayload = req.body;
    // TODO: validate the request body
    const record: DrizzleVisits = {
      domain: jsonPayload.domain,
      path: jsonPayload.path,
      timestamp: new Date().toUTCString(),
    };

    const result = await db.insert(visits).values(record);

    console.log('-> ', result.lastInsertRowid);

    res.json({message: 'Visit recorded'});
  }
);

app.get('/stats/:domain/:path', async (req: Request, res: Response) => {
  const domain = req.params.domain;
  const path = req.params.path;

  const result = await db
    .select()
    .from(visits)
    .where(and(eq(visits.domain, domain), eq(visits.path, path)))
    .orderBy(desc(visits.timestamp));

  console.log('-> ', result);

  res.json(result);
});

app.get('/count/:domain/:path', async (req: Request, res: Response) => {
  const domain = req.params.domain;
  const path = req.params.path;

  const [result] = await db
    .select({count: count()})
    .from(visits)
    .where(and(eq(visits.domain, domain), eq(visits.path, path)));

  console.log('-> ', result);

  res.json(result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
