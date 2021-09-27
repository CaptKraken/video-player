import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Player from "../components/Player";

export default function Home() {
  const defaultUrl =
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";
  const [url, setUrl] = useState(defaultUrl);
  const urlRef = useRef();
  useEffect(() => {
    urlRef.current.value = defaultUrl;
  }, []);
  const handleLoadVideo = () => {
    setUrl(urlRef.current.value);
  };
  return (
    <>
      <Head>
        <title>React Player with custom controls.</title>
      </Head>
      <div className="w-screen flex flex-col justify-center max-w-full">
        <h1 className="text-center text-3xl">React Player</h1>
        <div className="p-2 flex items-center gap-2">
          <input
            ref={urlRef}
            placeholder="Youtube or direct video link"
            className="bg-green-100 w-full p-2 rounded-md"
          />
          <button
            className="bg-green-100 min-w-max p-2 rounded-md"
            onClick={handleLoadVideo}
          >
            Load Video
          </button>
        </div>
        <Player url={url} />
      </div>
    </>
  );
}
