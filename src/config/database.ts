import mongoose from 'mongoose';
import 'dotenv/config';

let connection: typeof mongoose | string = '';

export async function connect() {
  try {
    connection = await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Conexão estabelecida com sucesso');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connection;
