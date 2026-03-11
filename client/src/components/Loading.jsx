export const Loading = () => {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={`loading-dot-${i}`}
          className="bg-custom-white animate-expand relative inline-block aspect-square h-20 w-20 rounded-full"
          style={{
            animationDelay: `${i * 100}ms`,
            transform: "scale(0)",
          }}
        >
          <div
            className="bg-custom-yellow animate-expand absolute inline-block aspect-square h-1/2 w-1/2 translate-x-1/4 translate-y-1/4 rounded-full"
            style={{
              animationDelay: `${(i + 1) * 100}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
