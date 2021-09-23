import Head from "next/head";
import VideoPlayer from "../components/VideoPlayer";

export default function Home() {
  return (
    <div className="w-screen flex flex-col justify-center">
      <h1 className="text-center text-3xl">React Player</h1>
      <div className="flex">
        <div style={{ flex: "60%" }}>
          <VideoPlayer />
        </div>
        <div style={{ flex: "30%" }}>haah</div>
      </div>
    </div>
  );
}
