import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {db} from './db';
import {users} from './db/schema';

dotenv.config();

const app: Express = express();
app.use(cors());

const port: number | string = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  const result = await db.insert(users).values({
    id: '1',
    name: 'John Stovner',
    age: 30,
    email: 'johnny.sto@test.com',
  });

  console.log('------>   ', result);
  res.send('Hello World: ');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
