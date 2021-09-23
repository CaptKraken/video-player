import { createRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { PlayIcon, PauseIcon, ArrowsExpandIcon } from "@heroicons/react/solid";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
// const VideoWrapper = ({ children }) => (
//   <div
//     className=" h-full w-full"
//     style={{
//       minHeight: "500px",
//       minWidth: "850px",
//     }}
//   >
//     {children}
//   </div>
// );

const initStats = {
  played: 0, // in percentages
  loaded: 0, // in percentages
  playedSeconds: 0, // in seconds
};

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const [playBackRate, setPlayBackRate] = useState(1);
  const playerRef = createRef();
  const playcontainerref = createRef();
  const [{ played, loaded, playedSeconds }, setVideoStats] =
    useState(initStats);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleFullScreen = () => {
    screenfull.toggle(playcontainerref.current);
    // screenfull.request(findDOMNode(playerRef.current));
  };

  const convertSeconds = (playedSeconds) => {
    const time = Number(playedSeconds?.toFixed(0));
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60;
    const hours = Math.floor(time / (60 * 60));
    const timeInHours = hours > 0 ? `0${hours}:` : "";
    const timeInMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timeInSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${timeInHours}${timeInMinutes}:${timeInSeconds}`;
  };
  const handleMuted = () => {
    setIsMuted(!isMuted);
  };
  const handleProgress = ({ played, loaded, playedSeconds }) => {
    if (!isSeeking) {
      setVideoStats((prev) => {
        return { ...prev, played, loaded, playedSeconds };
      });
    }
  };

  const handleSpeed = (speed) => {
    setPlayBackRate(speed);
  };

  const handleSeekMouseDown = () => {
    return setIsSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value), "fraction");
    setIsSeeking(false);
  };

  const handleSeekChange = (e) => {
    return setVideoStats((prev) => {
      return { ...prev, played: e.target.value };
    });
  };

  const handleLoop = () => {
    setLoop(!loop);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  useEffect(() => {
    console.log("duration", played);
  }, [played]);

  return (
    <div className="relative w-full" ref={playcontainerref}>
      <span>{convertSeconds(playedSeconds)}</span>
      <div className="p-4">
        <input
          className="w-full"
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
        <div>
          <p>volume: </p>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <button onClick={handleMuted}>
          mute = {isMuted ? "true" : "false"}
        </button>
        {/* <button
          onClick={() => {
            return setVideoStats((prev) => {
              return { ...prev, played: 0.5 };
            });
          }}
        >
          mute
        </button> */}
        <div className="flex gap-2 bg-green-200 justify-end">
          <button onClick={() => handleSpeed(1)}>x1</button>
          <button onClick={() => handleSpeed(1.5)}>x1.5</button>
          <button onClick={() => handleSpeed(2)}>x2</button>
        </div>
        <button onClick={handleLoop}>loop = {loop ? "true" : "false"}</button>
      </div>
      <div
        className="w-full flex items-center"
        onClick={() => setIsPlaying(!isPlaying)}
        onDoubleClick={handleFullScreen}
      >
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=woeGQXisGdE"}
          // url={
          //   "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
          // }
          width="850px"
          height="500px"
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          //   wrapper={VideoWrapper}
          loop={loop}
          ref={playerRef}
          onProgress={handleProgress}
          onEnded={() => setIsPlaying(false)}
          onDuration={(duration) => setDuration(duration)}
          muted={isMuted}
          playbackRate={playBackRate}
          volume={volume}
        />
      </div>
      <div className="absolute bottom-0 bg-gray-300 w-full flex items-center justify-between">
        <div className="text-sm">
          <span>{convertSeconds(playedSeconds)}</span> /{" "}
          <span>{convertSeconds(duration)}</span>
        </div>
        <div className="flex items-center">
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="flex items-center">
          <button onClick={handleFullScreen}>
            <ArrowsExpandIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
