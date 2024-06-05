import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const todo = await prisma.todo.findUnique({
          where: { id: Number(id) },
        });
        if (!todo) {
          return res.status(404).json({ error: "TODO not found" });
        }
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch TODO" });
      }
      break;
    case "PUT":
      const { title, description, completed } = req.body;
      try {
        const updatedTodo = await prisma.todo.update({
          where: { id: Number(id) },
          data: {
            title,
            description,
            completed,
          },
        });
        res.status(200).json(updatedTodo);
      } catch (error) {
        res.status(500).json({ error: "Failed to update TODO" });
      }
      break;
    case "DELETE":
      try {
        await prisma.todo.delete({
          where: { id: Number(id) },
        });
        res.status(200).json({ message: "TODO deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete TODO" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
