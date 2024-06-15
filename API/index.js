const express = require("express");
const server = express();
const { db } = require("./src/data/db/db");

server.use(express.json());

server.get("/todos", async (_req, res) => {
  try {
    const slugs = await db("slug").select("*");
    return res.status(200).send(slugs);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao procurar no banco" });
  }
});

server.post("/slug", async (req, res) => {
  try {
    const { slug_id, user_id } = req.body;
    const database = db("slugs_per_user");
    const userAlreadyRescueSlug = await database
      .select("*")
      .where({
        slug_id,
        user_id,
      })
      .first();

    if (userAlreadyRescueSlug) {
      throw new Error("Usuario já resgatou esse emblema");
    }

    await database.insert({
      slug_id,
      user_id,
    });

    return res.status(200).send({ message: "Emblema resgatado" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

server.get("/slug/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = Number(id);

  if (isNaN(user_id)) {
    return res.status(400).json({ message: "ID de usuário inválido" });
  }

  try {
    const slugsById = await db("slugs_per_user as su")
      .innerJoin("slug as s", function () {
        this.on("s.id", "=", "su.slug_id");
      })
      .select("s.slug", "s.name", "s.image")
      .where("su.user_id", user_id);

    if (slugsById.length === 0) {
      return res.status(404).send({ message: "Usuário não possui emblemas" });
    }

    return res.status(200).send(slugsById);
  } catch (error) {
    console.error("Erro ao buscar slugs:", error);
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT} ...`);
});
