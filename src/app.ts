import express,{Application, json} from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet, { permittedCrossDomainPolicies } from 'helmet';
import dotenv from 'dotenv';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';

dotenv.config();

const app:Application = express();
const port = process.env.PORT ||3000;

// middelwares
app.use(
    cors(),
    helmet(),
    
    json(),
    morgan('dev')
);
// routes
app.get('/',(req,res)=>{
    console.log('hello world')
});
app.listen(port,()=>{
    console.log(`server is runnins on port ${port}`)
})

userRoutes(app);
productRoutes(app);
orderRoutes(app);
export default app;


