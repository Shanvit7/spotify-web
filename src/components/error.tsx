const Error = ({ refetch, isRefetching }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <p className="text-white">Something unexpected occured.</p>
      <button
        onClick={refetch}
        className="mt-4 px-4 py-2 bg-white/10 text-white rounded-md flex items-center"
        disabled={isRefetching}
      >
        {isRefetching ? (
          <div className="w-6 h-6 border-4 border-t-2 border-white/40 border-solid rounded-full animate-spin" />
        ) : (
          "Retry"
        )}
      </button>
    </div>
  );
};

const ImageCoverError = () => (
  <div className="w-full md:h-64 rounded-lg mb-4 h-20 bg-gray-800 flex items-center justify-center">
    <span className="text-gray-500">Oops! Cover failed to load</span>
  </div>
);

export { Error, ImageCoverError };
