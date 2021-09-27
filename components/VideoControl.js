import Duration from "./Duration";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPlayArrow,
  MdPause,
  MdPlayCircleFilled,
  MdVolumeUp,
  MdVolumeOff,
  MdGraphicEq,
  MdSettings,
  MdClose,
  MdHelpOutline,
  MdInfoOutline,
} from "react-icons/md";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import { Box, Kbd } from "@chakra-ui/layout";
import { useState } from "react";
import { Switch } from "@chakra-ui/switch";
const VideoControl = ({
  isPlaying,
  handleplay,
  duration,
  progress,
  handleSeek,
  fullScreen,
  isFullScreen,
  handleSeekMouseUp,
  handleSeekMouseDown,
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange,
  loop,
  handleToggleLoop,
  playBackSpeed,
  handlePlaybackSpeed,
}) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const toggleSetting = () => {
    setOpenHelp(false);
    setOpenSettings(!openSettings);
  };
  const toggleHelp = () => {
    setOpenSettings(false);
    setOpenHelp(!openHelp);
  };
  return (
    <>
      {openSettings && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-72 opacity-90 select-none">
          <div className="flex items-center justify-between bg-gray-300 p-2">
            <div className="flex gap-2 items-center">
              <MdSettings className="h-6 w-6 text-green-400" />
              <p className="text-xl">Settings</p>
            </div>
            <button onClick={() => setOpenSettings(false)}>
              <MdClose className="h-6 w-6 text-red-400 hover:bg-gray-200" />
              <p className="sr-only">Close</p>
            </button>
          </div>
          <div className="px-4 pb-2">
            <div className="p-2 flex items-center justify-between">
              <p>Loop</p>
              <Switch
                isChecked={loop}
                onChange={handleToggleLoop}
                colorScheme="green"
              />
            </div>
            <div className="p-2 flex items-center justify-between">
              <p>Speed ({playBackSpeed})</p>
              <div className="w-1/2 flex items-center gap-2">
                <Slider
                  aria-label="adjust volume"
                  min={0.25}
                  max={2}
                  step={0.25}
                  onChange={handlePlaybackSpeed}
                  value={playBackSpeed}
                >
                  <SliderTrack bg="green.100">
                    <SliderFilledTrack bg="green.300" />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="green.500" as={MdGraphicEq} />
                  </SliderThumb>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      )}
      {openHelp && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-72 opacity-90 select-none">
          <div className="flex items-center justify-between bg-gray-300 p-2">
            <div className="flex gap-2 items-center">
              <MdInfoOutline className="h-6 w-6 text-green-400" />
              <p className="text-xl">Help</p>
            </div>
            <button onClick={() => setOpenHelp(false)}>
              <MdClose className="h-6 w-6 text-red-400 hover:bg-gray-200" />
              <p className="sr-only">Close</p>
            </button>
          </div>

          <div className="px-4 pb-2">
            <p className="p-2 text-xs font-semibold italic">
              For direct video link
            </p>
            <div className="p-2 flex items-center justify-between">
              <p className="text-sm">Toggle Play/Pause</p>
              <Kbd>Space</Kbd>
            </div>
            <div className="p-2 flex items-center justify-between">
              <p className="text-sm">Forward +5s</p>
              <Kbd>Right Arrow &rarr;</Kbd>
            </div>
            <div className="p-2 flex items-center justify-between">
              <p className="text-sm">Backend -5s</p>
              <Kbd>Left Arrow &larr;</Kbd>
            </div>
            <div className="p-2 flex items-center justify-between">
              <p className="text-sm">Volume +10%</p>
              <Kbd>Up Arrow &uarr;</Kbd>
            </div>
            <div className="p-2 flex items-center justify-between">
              <p className="text-sm">Volume -10%</p>
              <Kbd>Down Arrow &darr;</Kbd>
            </div>
          </div>
        </div>
      )}
      {!isPlaying && !openSettings && !openHelp && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button onClick={handleplay}>
            <MdPlayArrow className="w-52 h-52 text-green-400 drop-shadow-lg hover:text-green-300 hover:scale-105 border-solid border-4 border-green-400 hover:border-green-300 rounded-full transition-all bg-green-200 hover:bg-green-100" />
            <p className="sr-only">Play</p>
          </button>
        </div>
      )}
      <div className="w-full absolute bottom-0 group">
        <div className="bg-gray-100 p-4 invisible opacity-0 group-hover:visible group-hover:opacity-90 transition-all duration-300 group-hover:block">
          <div className="flex items-center gap-4 opacity-100">
            <Slider
              aria-label="slider-ex-4"
              min={0}
              max={1}
              step={0.01}
              onMouseUp={handleSeekMouseUp}
              onMouseDown={handleSeekMouseDown}
              onChangeStart={handleSeekMouseDown}
              onChangeEnd={handleSeekMouseUp}
              onChange={handleSeek}
              value={progress.played}
            >
              <SliderTrack bg="green.100">
                <SliderFilledTrack bg="green.300" />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color="green.500" as={MdPlayCircleFilled} />
              </SliderThumb>
            </Slider>
            <div className="relative min-w-max">
              <Duration
                seconds={progress.playedSeconds}
                className={"text-center"}
              />
              <span> / </span>
              <Duration seconds={duration} className={"text-center"} />
            </div>
          </div>

          <div className="flex items-center justify-between opacity-100 relative">
            <div className="flex items-center gap-2">
              <button onClick={handleplay}>
                {!isPlaying && (
                  <>
                    <MdPlayArrow className="h-8 w-8 text-green-400 hover:text-green-300" />
                    <span className="sr-only">Play</span>
                  </>
                )}
                {isPlaying && (
                  <>
                    <MdPause className="h-8 w-8 text-green-400 hover:text-green-300" />
                    <span className="sr-only">Pause</span>
                  </>
                )}
              </button>
              <button onClick={toggleMute}>
                {!isMuted && (
                  <>
                    <MdVolumeUp className="h-8 w-8 text-green-400 hover:text-green-300" />
                    <span className="sr-only">Mute</span>
                  </>
                )}
                {isMuted && (
                  <>
                    <MdVolumeOff className="h-8 w-8 text-green-400 hover:text-green-300" />
                    <span className="sr-only">Unmute</span>
                  </>
                )}
              </button>
              <div className="flex items-center w-40">
                <Slider
                  aria-label="adjust volume"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleVolumeChange}
                  value={volume}
                >
                  <SliderTrack bg="green.100">
                    <SliderFilledTrack bg="green.300" />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="green.500" as={MdGraphicEq} />
                  </SliderThumb>
                </Slider>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleSetting}>
                <MdSettings className="h-6 w-6 text-green-400 hover:text-green-300" />
              </button>
              <button onClick={toggleHelp}>
                <MdHelpOutline className="h-6 w-6 text-green-400 hover:text-green-300" />
              </button>
              <button onClick={fullScreen} className="rounded-sm">
                {!isFullScreen ? (
                  <>
                    <MdFullscreen className="h-6 w-6 text-green-400 hover:text-green-300" />
                    <span className="sr-only">Enter Fullscreen</span>
                  </>
                ) : (
                  <>
                    <MdFullscreenExit className="h-6 w-6 text-green-400 hover:text-green-300" />
                    <span className="sr-only">Leave Fullscreen</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoControl;
