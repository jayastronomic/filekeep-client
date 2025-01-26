import ConsoleAssets from "./ConsoleAssets";
const Console = () => {
  return (
    <main className="flex flex-col h-full w-full p-6">
      <h1 className="font-semibold text-2xl my-4 text-gray-700">All files</h1>
      <ConsoleAssets />
    </main>
  );
};

export default Console;
