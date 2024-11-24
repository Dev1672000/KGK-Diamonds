// plugins/VideoEmbed/index.tsx
import React from "react";

const VideoEmbed = (): JSX.Element => {
  return (
    <div>
      <h3>Video Embed Plugin</h3>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
