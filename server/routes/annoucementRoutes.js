// routes/announcementRoutes.js
import express from "express";
import { Announcement } from "../model/Announcement.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Announcement.destroy({
      where: { id: id },  // MySQL me id ke basis par delete
    });

    if (deleted) {
      res.status(200).json({ message: "Announcement deleted successfully" });
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
