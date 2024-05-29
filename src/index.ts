import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {db} from './db';
import {DrizzleVisits, visits} from './db/schema';
import {VisitRequestBody} from './definitions';
import {and, count, desc, eq} from 'drizzle-orm';
import {envVars} from './lib/environments';
import {isEmpty} from './lib/tools';

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
    const {hostName, path} = req.body;

    if (isEmpty(hostName) || isEmpty(path)) {
      res.status(400).json({message: 'Invalid request body'});
      return;
    }

    // TODO: validate the request body
    const record: DrizzleVisits = {
      hostname: hostName,
      path: path,
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

app.get('/stats/:hostname/:path', async (req: Request, res: Response) => {
  const hostname = req.params.hostname;
  const path = req.params.path;

  const result = await db
    .select()
    .from(visits)
    .where(and(eq(visits.hostname, hostname), eq(visits.path, path)))
    .orderBy(desc(visits.timestamp));

  res.json(result);
});

app.get('/count/:hostname/:path', async (req: Request, res: Response) => {
  const hostname = req.params.hostname;
  const path = req.params.path;

  const [result] = await db
    .select({count: count()})
    .from(visits)
    .where(and(eq(visits.hostname, hostname), eq(visits.path, path)));

  res.json(result);
});

app.listen(PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${envVars.PORT}`
  );
});
