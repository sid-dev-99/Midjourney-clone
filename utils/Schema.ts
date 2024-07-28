 import {zValidator} from '@hono/zod-validator';
 import {z} from 'zod';

 export const querySchema = z.object({
    prompt:z.string()
 })