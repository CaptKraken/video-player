import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoControl from "../components/VideoControl";
import screenfull from "screenfull";
const init = {
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
};

const player = () => {
  const playerContainerRef = useRef();
  const playerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(init);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleplay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullScreen = () => {
    setIsFullScreen(screenfull.isFullscreen);
    screenfull.toggle(playerContainerRef.current);
    // screenfull.request(findDOMNode(playerRef.current));
  };

  return (
    <div className="w-full relative transition-all" ref={playerContainerRef}>
      <ReactPlayer
        url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
        width="100%"
        height="100%"
        ref={playerRef}
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onProgress={({ played, playedSeconds, loaded, loadedSeconds }) => {
          console.log(played, playedSeconds, loaded, loadedSeconds);
          setProgress({ played, playedSeconds, loaded, loadedSeconds });
        }}
        onDuration={(duration) => console.log("duration", duration)}
      />
      <VideoControl
        isPlaying={isPlaying}
        handleplay={handleplay}
        progress={progress}
        fullScreen={handleFullScreen}
        isFullScreen={isFullScreen}
      />
    </div>
  );
};

export default player;
