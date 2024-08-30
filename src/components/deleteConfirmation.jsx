export function DeleteConfirmation({
  type,
  name,
  delFunc,
  setDelCon,
  deleting,
}) {
  return (
    <div className="h-screen w-screen bg-[#000000a7] flex justify-center items-center fixed top-0 left-0 text-white text-xl flex-col">
      <p>
        Do you really want to delete this {type} ({name})?
      </p>
      <div className="flex">
        <button
          className={`bg-green-600 p-3 m-3 rounded-md ${
            deleting && "cursor-not-allowed opacity-60"
          }`}
          onClick={delFunc}
          disabled={deleting}
        >
          {deleting ? "Please Wait..." : "Yes"}
        </button>
        {!deleting && (
          <button
            className="bg-red-600 p-3 m-3 rounded-md"
            onClick={() => setDelCon(false)}
          >
            no
          </button>
        )}
      </div>
    </div>
  );
}
