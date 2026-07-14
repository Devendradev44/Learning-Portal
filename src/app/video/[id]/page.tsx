"use client";
import { useParams } from "next/navigation";
import { videos } from "@/data/videos";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});


interface Bookmark {
  id: number;
  name: string;
  time: number;
}

export default function VideoPage() {
  const playerRef = useRef<any>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const params = useParams();
  const video = videos.find((v) => v.id === params.id);
    if (!video) {
    return (
        <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Video not found</h1>
        </main>
    );
    }

  // Load bookmarks for the current video
    useEffect(() => {
    if (!video) return;

    const saved = localStorage.getItem(`bookmarks-${video.id}`);

    if (saved) {
        setBookmarks(JSON.parse(saved));
    } else {
        setBookmarks([]);
    }
    }, [video]);

    // Save bookmarks for the current video
    useEffect(() => {
    if (!video) return;

    localStorage.setItem(
        `bookmarks-${video.id}`,
        JSON.stringify(bookmarks)
    );
    }, [bookmarks, video]);

  const addBookmark = () => {
    const name =
      prompt("Enter Bookmark Name (Optional)") ||
      `Bookmark ${bookmarks.length + 1}`;

    const bookmark: Bookmark = {
      id: Date.now(),
      name,
      time: currentTime,
    };

    setBookmarks((prev) => [...prev, bookmark]);
  };

  const seekToBookmark = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
    }
  };

  const deleteBookmark = (id: number) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          {video.title}
        </h1>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <ReactPlayer
            ref={playerRef}
            url={video.url}
            controls
            width="100%"
            height="500px"
            onProgress={({ playedSeconds }) =>
              setCurrentTime(playedSeconds)
            }
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={addBookmark}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Bookmark
          </button>

          <div className="flex items-center text-gray-700 font-semibold">
            Current Time: {formatTime(currentTime)}
          </div>
        </div>

        <div className="bg-white mt-8 rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Bookmarks
          </h2>

          {bookmarks.length === 0 ? (
            <p className="text-gray-500">
              No bookmarks added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="flex justify-between items-center bg-gray-100 rounded-lg p-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {bookmark.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {formatTime(bookmark.time)}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => seekToBookmark(bookmark.time)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Resume
                    </button>

                    <button
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}