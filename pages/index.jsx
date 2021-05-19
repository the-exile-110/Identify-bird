import Predic from "../components/Predic";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex flex-col mt-20 h-96 w-auto justify-center content-center items-center">
          <h2 className="mt-20 text-4xl font-bold text-gray-700">
            Identify a bird
          </h2>
          <Predic />
        </div>
      </main>
    </div>
  );
}
