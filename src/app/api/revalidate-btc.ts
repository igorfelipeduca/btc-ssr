"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { revalidateTag } from "next/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    revalidateTag("BTC");
    res.status(200).json({ message: "BTC revalidated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to revalidate" });
  }
}
