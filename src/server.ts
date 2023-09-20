import { init } from './app';

const port = process.env.port || 5000;

init().then((app) => {
  app.listen(port, () =>
    console.log(`
  Servidor iniciado na porta 5000
`)
  );
});
