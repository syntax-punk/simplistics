import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {db} from './db';
import {DrizzleVisits, visits} from './db/schema';
import {VisitRequestBody} from './definitions';
import {and, count, desc, eq} from 'drizzle-orm';
import {envVars} from './lib/environments';

const {PORT, ALLOWED_HOSTS} = envVars;

const app: Express = express();
app.use(
  cors({
    origin: ALLOWED_HOSTS,
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

    res.json({message: 'Visit recorded', changes: result.changes});
  }
);

app.get('/stats/all', async (req: Request, res: Response) => {
  const result = await db.select().from(visits).all();
  res.json(result);
});

app.get('/stats/:domain/:path', async (req: Request, res: Response) => {
  const domain = req.params.domain;
  const path = req.params.path;

  const result = await db
    .select()
    .from(visits)
    .where(and(eq(visits.domain, domain), eq(visits.path, path)))
    .orderBy(desc(visits.timestamp));

  res.json(result);
});

app.get('/count/:domain/:path', async (req: Request, res: Response) => {
  const domain = req.params.domain;
  const path = req.params.path;

  const [result] = await db
    .select({count: count()})
    .from(visits)
    .where(and(eq(visits.domain, domain), eq(visits.path, path)));

  res.json(result);
});

app.listen(PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${envVars.PORT}`
  );
});
