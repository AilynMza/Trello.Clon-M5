import { create } from "json-server";

const jsonServer = create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ static: false }); // 👈 Aquí desactivas que busque "public"

const PORT = process.env.PORT || 3000;

jsonServer.use(middlewares);
jsonServer.use(router);

jsonServer.listen(PORT, () => {
  console.log(`JSON Server corriendo en http://localhost:${PORT}`);
});
