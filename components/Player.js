import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoControl from "../components/VideoControl";
import screenfull from "screenfull";
import { format } from "../components/Duration";
const init = {
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
};

const Player = ({ url }) => {
  const playerContainerRef = useRef();
  const playerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playBackSpeed, setPlayBackSpeed] = useState(1);
  const [statusText, setStatusText] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [loop, setLoop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(init);
  const [duration, setDuration] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleplay = () => {
    setStatusText(isPlaying ? "Paused" : "Playing");
    setIsPlaying(!isPlaying);
  };

  const handlePlaybackSpeed = (speed) => {
    setStatusText(`Speed x${speed}`);
    setPlayBackSpeed(speed);
  };

  const handleFullScreen = () => {
    setStatusText(
      screenfull.isFullscreen ? "Exit FullScreen" : "Enter Fullscreen"
    );
    screenfull.toggle(playerContainerRef.current);
    setIsFullScreen(!screenfull.isFullscreen);
  };
  const handleSeekMouseDown = () => {
    setStatusText("Seeking");
    return setIsSeeking(true);
  };
  const handleToggleMute = () => {
    setStatusText(isMuted ? "Unmuted" : "Muted");
    setIsMuted(!isMuted);
  };
  const handleToggleLoop = () => {
    setLoop(!loop);
  };
  const handleSeekMouseUp = (e) => {
    setStatusText("Seeking");
    playerRef.current.seekTo(parseFloat(e), "fraction");
    setIsSeeking(false);
  };
  const handleSeekChange = (e) => {
    return setProgress((prev) => {
      return { ...prev, played: e };
    });
  };
  const handleVolumeChange = (e) => {
    setStatusText(`${Math.floor(e * 100)}%`);
    setVolume(parseFloat(e));
  };

  const handleKeyboardControl = (e) => {
    switch (e.key) {
      case " ":
        setStatusText(isPlaying ? "Paused" : "Playing");
        return handleplay();
      case "ArrowLeft": {
        const time = progress.playedSeconds - 5;
        setStatusText(format(time > 0 ? progress.playedSeconds - 5 : 0));
        return playerRef.current.seekTo(progress.playedSeconds - 5, "seconds");
      }
      case "ArrowRight": {
        const time = progress.playedSeconds + 5;
        setStatusText(
          format(time > duration ? duration : progress.playedSeconds + 5)
        );
        return playerRef.current.seekTo(progress.playedSeconds + 5, "seconds");
      }
      case "ArrowUp": {
        const volumechange = Math.ceil((volume + 0.1) * 100);
        setStatusText(volumechange < 100 ? `${volumechange}%` : `100%`);
        return setVolume((prev) => {
          if (prev + 0.1 > 1) return 1;
          return prev + 0.1;
        });
      }
      case "ArrowDown": {
        const volumechange = Math.floor((volume - 0.1) * 100);
        setStatusText(volumechange > 0 ? `${volumechange}%` : `0%`);
        return setVolume((prev) => {
          if (prev - 0.1 < 0) return 0;
          return prev - 0.1;
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setStatusText(""), 5000);
  }, [statusText]);

  const isYoutube = url.includes("youtu");

  return (
    <div
      className="w-full relative transition-all"
      onDoubleClick={handleFullScreen}
      ref={playerContainerRef}
    >
      <div onClick={handleplay} tabIndex={0} onKeyDown={handleKeyboardControl}>
        <ReactPlayer
          url={url}
          style={{ minHeight: "40rem" }}
          width="100%"
          height={isYoutube ? "100vh" : "100%"}
          ref={playerRef}
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onProgress={({ played, playedSeconds, loaded, loadedSeconds }) => {
            return setProgress({
              played,
              playedSeconds,
              loaded,
              loadedSeconds,
            });
          }}
          onDuration={(duration) => {
            return setDuration(duration);
          }}
          playbackRate={playBackSpeed}
          muted={isMuted}
          controls={false}
          volume={volume}
          loop={loop}
        />
      </div>
      <VideoControl
        isPlaying={isPlaying}
        handleplay={handleplay}
        duration={duration}
        progress={progress}
        handleSeek={handleSeekChange}
        fullScreen={handleFullScreen}
        isFullScreen={isFullScreen}
        handleSeekMouseUp={handleSeekMouseUp}
        handleSeekMouseDown={handleSeekMouseDown}
        isMuted={isMuted}
        toggleMute={handleToggleMute}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        loop={loop}
        handleToggleLoop={handleToggleLoop}
        playBackSpeed={playBackSpeed}
        handlePlaybackSpeed={handlePlaybackSpeed}
      />
      <p className="absolute text-white top-8 right-8 text-xl lg:text-3xl">
        {statusText}
      </p>
    </div>
  );
};

export default Player;
