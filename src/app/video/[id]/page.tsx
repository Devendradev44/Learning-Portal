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
  const [blur, setBlur] = useState(false);
  

  const params = useParams();
  const video = videos.find((v) => v.id === params.id);
    if (!video) {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-10 px-5">
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

    // Continue Watching
        useEffect(() => {
        localStorage.setItem(
            `progress-${video.id}`,
            currentTime.toString()
        );
        }, [currentTime, video.id]);

        useEffect(() => {
        const saved = localStorage.getItem(`progress-${video.id}`);

        if (saved && playerRef.current) {
            setTimeout(() => {
            playerRef.current.seekTo(Number(saved), "seconds");
            }, 800);
        }
        }, [video.id]);

        // Screenshot deterrents
        useEffect(() => {
        const disableRightClick = (e: MouseEvent) => e.preventDefault();

        document.addEventListener("contextmenu", disableRightClick);

        const visibility = () => {
            setBlur(document.hidden);
        };

        document.addEventListener(
            "visibilitychange",
            visibility
        );

        return () => {
            document.removeEventListener(
            "contextmenu",
            disableRightClick
            );

            document.removeEventListener(
            "visibilitychange",
            visibility
            );
        };
        }, []);



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
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-black-800 mb-6">
          {video.title}
        </h1>

        <div className="relative rounded-xl overflow-hidden shadow-lg">

            <div className="absolute top-4 right-4 z-50 bg-black/70 text-white px-3 py-1 rounded text-sm">
                GVCC Learning Portal • Devendra
            </div>

            <div className={blur ? "blur-xl pointer-events-none" : ""}>
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

        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
          <button
            onClick={addBookmark}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            + Add Bookmark
          </button>

          <div className="flex items-center text-black font-bold text-lg">
            Current Time : {formatTime(currentTime)}
          </div>
        </div>

        <div className="bg-white mt-10 rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-black mb-6">
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
                  className="flex flex-col md:flex-row justify-between items-center bg-slate-100 hover:bg-slate-200 transition rounded-xl p-5"
                >
                  <div>
                    <h3 className="font-bold text-black">
                      {bookmark.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {formatTime(bookmark.time)}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => seekToBookmark(bookmark.time)}
                      className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl shadow"
                    >
                      Resume
                    </button>

                    <button
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-xl shadow"
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