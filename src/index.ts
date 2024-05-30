import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {db, store} from './db';
import {VisitEntity, VisitRequestBody} from './definitions';
import {envVars} from './lib/environments';
import {isEmpty} from './lib/tools';
import {addDoc, getDocs, query, where} from 'firebase/firestore';

const {PORT, ALLOWED_HOSTS} = envVars;

console.log('--> PORT: ', PORT);
console.log('--> ALLOWED_HOSTS: ', ALLOWED_HOSTS);

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
    const record: VisitEntity = {
      hostname: hostName,
      path: path,
      timestamp: new Date().toUTCString(),
    };

    const result = await addDoc(store, record);

    res.json({message: 'Visit recorded', changes: result.id});
  }
);

app.get('/stats/all', async (req: Request, res: Response) => {
  const result = (await getDocs(store)).docs.map(
    doc => doc.data() as VisitEntity
  );

  res.json(result);
});

app.get('/stats/:hostname/:path', async (req: Request, res: Response) => {
  const hostname = req.params.hostname;
  const path = req.params.path;

  const abQuery = query(
    store,
    where('hostname', '==', hostname),
    where('path', '==', path)
  );

  const result = (await getDocs(abQuery)).docs.map(
    doc => doc.data() as VisitEntity
  );

  res.json(result);
});

app.get('/count/:hostname/:path', async (req: Request, res: Response) => {
  const hostname = req.params.hostname;
  const path = req.params.path;

  const abQuery = query(
    store,
    where('hostname', '==', hostname),
    where('path', '==', path)
  );

  const result = (await getDocs(abQuery)).docs.map(
    doc => doc.data() as VisitEntity
  ).length;

  res.json({count: result});
});

app.listen(PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${envVars.PORT}`
  );
});
