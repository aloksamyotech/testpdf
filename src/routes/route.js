import express from "express";
import { generateCertificate } from "../controller/pdf.js";
const router = express.Router();
router.post("/create-pdf", generateCertificate)

export default router;
