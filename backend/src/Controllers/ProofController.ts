import { Reclaim } from "@reclaimprotocol/js-sdk";
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

interface AuthenticatedRequest extends Request {
  email?: string;
  role?: string;
}

interface ProofRequestResult {
  requestUrl: string;
  statusUrl: string;
}

export const requestProof = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.email;

    // Instantiate Reclaim for proof request
    const reclaimClient = new Reclaim.ProofRequest(
      process.env.RECLAIM_APPLICATION_ID as string
    );

    // Provider IDs for different proofing mechanism
    const providerIds = [
      "6d3f6753-7ee6-49ee-a545-62f1b1822ae5", // GitHub Provider ID
      "e83f3b89-cefa-4f63-bbed-deb0c94f7986", // Aadhar Provider ID
    ];

    const APP_SECRET = process.env.RECLAIM_APP_SECRET as string;

    // Add context to proof for preventing proof reuse and duplication
    await reclaimClient.addContext(
      `user's address` /* put user's blockchain address here */,
      `for userId: ${userId} on ${new Date().toISOString()}`
    );

    const sessionData = await reclaimClient.buildProofRequest(providerIds[Number(req.query.id)], true, 'V2Linking');

    // Add signature before proof generation to prevent phishing
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    );

    const { requestUrl, statusUrl }: ProofRequestResult =
      await reclaimClient.createVerificationRequest();

    res.status(200).send({ requestUrl, statusUrl });
    // Start the session and await its completion

  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
