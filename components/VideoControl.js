import {
  ArrowsExpandIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import Duration from "./Duration";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPlayArrow,
  MdPause,
} from "react-icons/md";

const VideoControl = ({
  isPlaying,
  handleplay,
  progress,
  fullScreen,
  isFullScreen,
}) => {
  return (
    <div className="w-full absolute bottom-0 group">
      <div className="bg-gray-400 p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 group-hover:block">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-400 flex-1 h-2 min-h-full">
            <div
              className="bg-indigo-700 h-2 transition-all duration-200"
              style={{ width: `${progress.played * 100}%` }}
            >
              &nbsp;
            </div>
          </div>
          <div className="relative min-w-max">
            <Duration
              seconds={progress.playedSeconds}
              className={"text-center"}
            />
          </div>
        </div>

        <p>playing = {isPlaying ? "true" : "false"}</p>
        <p>
          played: {progress.played}, playedSeconds: {progress.playedSeconds},
          loaded: {progress.loaded}, loadedSeconds: {progress.loadedSeconds}{" "}
        </p>

        {/* <div class="slidecontainer">
        <p>Custom range slider:</p>
        <input
          type="range"
          min="0"
          max="1"
          value={progress.played}
          class="slider"
          id="myRange"
        />
      </div>
       */}
        <button onClick={fullScreen} className="hover:bg-green-400 rounded-sm">
          {isFullScreen && (
            <>
              <MdFullscreen className="h-8 w-8 text-indigo-700" />
              <span className="sr-only">Enter Fullscreen</span>
            </>
          )}
          {!isFullScreen && (
            <>
              <MdFullscreenExit className="h-8 w-8 text-indigo-700" />
              <span className="sr-only">Leave Fullscreen</span>
            </>
          )}
        </button>
        <button onClick={handleplay}>
          {!isPlaying && (
            <>
              <MdPlayArrow className="h-8 w-8 text-indigo-700" />
              <span className="sr-only">Toggle Fullscreen</span>
            </>
          )}
          {isPlaying && (
            <>
              <MdPause className="h-8 w-8 text-indigo-700" />
              <span className="sr-only">Toggle Fullscreen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoControl;
