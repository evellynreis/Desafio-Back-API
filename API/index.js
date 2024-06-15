const express = require("express");
const server = express();
const { db } = require("./src/data/db/db");

server.use(express.json());

server.get("/todos", async (req, res) => {
  const { name } = req.query;
  try {
    let query = db("slug").select("*");

    if (name) {
      query = query.where("name", "like", `%${name}%`);
    }

    const slugs = await query;
    return res.status(200).json(slugs);
  } catch (error) {
    console.error("Erro ao procurar no banco:", error);
    return res.status(500).json({ message: "Erro ao procurar no banco" });
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
      return res.status(409).send({ message: "Usuario já resgatou esse emblema" });
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
      .innerJoin("slug as s", "s.id", "=", "su.slug_id")
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
  console.log(`Servidor está funcionando na porta ${PORT}...`);
});
