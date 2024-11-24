// lib/server/pluginManager.ts
import { PluginBlock } from "../server/types"; // Import PluginBlock type

export const loadPlugins = async (): Promise<PluginBlock[]> => {
  const plugins: PluginBlock[] = [];

  try {
    const ImageSlider = await import("../../plugins/ImageSlider/index");
    plugins.push({ name: "ImageSlider", render: ImageSlider.default });

    const VideoEmbed = await import("../../plugins/VideoEmbed/index");
    plugins.push({ name: "VideoEmbed", render: VideoEmbed.default });  // Ensure this matches the expected type
  } catch (error) {
    console.error("Error loading plugins:", error);
  }

  return plugins;
};
