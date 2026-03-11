export const Loading = () => {
  return (
    <div className="flex h-[90.4vh] items-center justify-center bg-black">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`bg-custom-white loading-dot inline-block h-20 w-20 rounded-full loading-dot-${i}`}
        />
      ))}
    </div>
  );
};
