import { getMessageById, updateMessageById, deleteMessageById } from "@/database";

export default async function handler(req, res) {
  const { messageId } = req.query;
  console.log(req.body.text)
  switch (req.method) {
    case "GET":
        
      // Get a message by ID
      res
      const messages = await getMessageById(messageId);
      res.status(200).json(messages);
      break;
      
      case "PUT":
        // Update a message by id
        const { newMessage } = req.body
        console.log(messageId, newMessage)
        if (!req.body) {
          res.status(400).json({ message: "Missing message name" });
          break;
        }
        const updatedMessage = await updateMessageById(messageId, req.body.text);
        if (!updatedMessage) {
          res.status(404).json({ message: "Message not found" });
          break;
        }
        res.status(200).json(updatedMessage);
        break;
        case "DELETE":
            // Delete a message by id
            await deleteMessageById(messageId);
            res.status(204).end();
            break;
    default:
      res.status(405).end();
  }
}
