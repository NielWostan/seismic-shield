export const Info = ({ file, query }) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white text-black mb-7">
      <p className="text-3xl mb-4">{file}</p>
      <p className="text-xl">{query}</p>
    </div>
  );
};
