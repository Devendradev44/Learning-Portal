import Link from "next/link";
import Image from "next/image";
import { videos } from "@/data/videos";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold">
            GVCC Learning Portal
          </h1>

          <p className="mt-3 text-lg text-blue-100">
            Learn anytime, bookmark important moments, and continue watching
            where you left off.
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="max-w-7xl mx-auto py-10 px-6">

        <h2 className="text-3xl font-bold mb-8">
          Available Courses
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {videos.map((video) => (

            <div
              key={video.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <Image
                src={video.thumbnail}
                alt={video.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
                priority
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {video.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  Duration : {video.duration}
                </p>

                <div className="mt-5">

                  <Link
                    href={`/video/${video.id}`}
                    className="block text-center bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl"
                  >
                    ▶ Watch Course
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}