import { useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import { ScreenSizeProvider } from "../../providers/ScreenSizeProvider.jsx";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <ScreenSizeProvider>
      <nav className="lg:light-shadow-small flex flex-col-reverse items-center justify-between gap-4 bg-transparent px-4 py-2 lg:flex-row lg:gap-16 lg:px-8 lg:py-4">
        <div className="hidden w-full items-center justify-center gap-4 lg:flex">
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleLogoClick}>
            <img
              src="/logo.svg"
              className="h-17.5 invert-100"
              alt="Cook 'Em All Logo"
            />
            <div className="text-custom-white text-2xl tracking-wider uppercase">
              Cook 'Em All
            </div>
          </div>
        </div>

        <SearchBar />

        <div className="flex w-full items-center justify-evenly gap-8">
          <p
            onClick={() => navigate("/")}
            className="text-custom-white cursor-pointer text-lg font-medium transition-opacity duration-100 hover:opacity-80 lg:text-xl"
          >
            Home
          </p>

          <p
            onClick={() => navigate("/recipe/create")}
            className="text-custom-white cursor-pointer text-lg font-medium transition-opacity duration-100 hover:opacity-80 lg:text-xl"
          >
            Create recipe
          </p>
        </div>
      </nav>
    </ScreenSizeProvider>
  );
}
