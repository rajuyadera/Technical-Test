import express from "express"
import { borrowBooks, getMember, returnBooks } from "../controllers/MembersController.js"

const router = express.Router()

router.get("/api/members", getMember)
router.post("/api/borrow/:memberCode/:bookCode", borrowBooks)
router.post("/api/return/:memberCode/:bookCode", returnBooks)

export default router