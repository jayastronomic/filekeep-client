const NotFound = () => {
  return (
    <main className="flex flex-col items-center h-full w-full p-4">
      <img className="w-56 mt-48" src="/images/404.png" alt="404 Status Code" />
      <div className="text-2xl text-gray-700 mt-10">Error (NOT FOUND)</div>
      <p className="font-light text-lg mt-4">
        We can't find the page you're looking for.
      </p>
    </main>
  );
};

export default NotFound;
