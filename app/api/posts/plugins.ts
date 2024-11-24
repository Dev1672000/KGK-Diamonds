import { loadPlugins } from "@/lib/server/pluginManager";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const plugins = loadPlugins();
    console.log("Loaded plugins:", plugins);
    res.status(200).json(plugins);
  } catch (error) {
    console.error("Error loading plugins:", error);
    res.status(500).json({ error: "Failed to load plugins" });
  }
}
