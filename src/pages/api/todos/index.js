import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch TODOs" + error });
      }
      break;
    case "POST":
      const { title, description } = req.body;
      try {
        const newTodo = await prisma.todo.create({
          data: {
            title,
            description,
          },
        });
        res.status(201).json(newTodo);
      } catch (error) {
        res.status(500).json({ error: "Failed to add TODO" + error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
