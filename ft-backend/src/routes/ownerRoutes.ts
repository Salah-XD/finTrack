import express, { Request, Response } from "express";
import { verifyControlPanelPassword,createBus,createAgent,createOperator ,setOpeningBalance} from "../controllers/user-feature/controlPanelController";
import { verifyUser } from "../middleware/userMiddleware";

const router = express.Router();



router.post("/verify-password",verifyUser, async (req: Request, res: Response) => {
    try {
      await verifyControlPanelPassword(req, res); // Ensure this is awaited
    } catch (error) {
      res.status(500).json({ error: "Error during verification process." });
    }
  });

router.post("/bus",verifyUser, async (req: Request, res: Response) => {
    try {
      await createBus(req, res); // Ensure this is awaited
    } catch (error) {
      res.status(500).json({ error: "Error during registering Bus." });
    }
  });

router.post("/agent",verifyUser, async (req: Request, res: Response) => {
    try {
      await createAgent(req, res); // Ensure this is awaited
    } catch (error) {
      res.status(500).json({ error: "Error during registering agent." });
    }
  });

router.post("/operator",verifyUser, async (req: Request, res: Response) => {
    try {
      await createOperator(req, res); // Ensure this is awaited
    } catch (error) {
      res.status(500).json({ error: "Error during registering BusOperator." });
    }
  });

router.post("/balance",verifyUser, async (req: Request, res: Response) => {
    try {
      await setOpeningBalance(req, res); // Ensure this is awaited
    } catch (error) {
      res.status(500).json({ error: "Error setting  balance." });
    }
  });


  export default router;

