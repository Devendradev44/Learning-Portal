import Link from "next/link";
import { videos } from "@/data/videos";
import Image from "next/image";   

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Learning Portal</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow p-5"
          >
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={280}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
            <h2 className="text-xl font-semibold">
              {video.title}
            </h2>

            <p className="text-gray-500">
              Duration: {video.duration}
            </p>

            <Link
              href={`/video/${video.id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Watch Video
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}