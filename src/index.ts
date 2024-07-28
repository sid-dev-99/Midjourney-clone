import { cors } from 'hono/cors';
import { Hono } from 'hono';
import {Context} from 'hono';
import { zValidator } from '@hono/zod-validator';
import { querySchema } from '../utils/Schema';

const app = new Hono();


app.use('*', cors({
  origin: '*',
  allowMethods: ['GET'],
  allowHeaders: ['Content-Type', 'Authorization']
}))


app.get('/',zValidator('query',querySchema),async (c:Context | any) => {
 
  const prompt = await c.req.valid('query');
  const inputs = prompt;


  const response = await c.env.AI.run("@cf/bytedance/stable-diffusion-xl-lightning",inputs);

  return new Response(response,
    {
      headers:{
        "content-type": "image/png"
      }
    }
  );
})
export default app
//zValidator('query',z.object({prompt:z.string()}))