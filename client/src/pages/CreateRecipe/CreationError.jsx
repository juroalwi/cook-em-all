import { useNavigate } from "react-router-dom";
import { NotificationBox } from "src/components/NotificationBox";

export const CreationError = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-4 my-8 lg:mx-8 lg:my-12">
      <div className="mx-auto w-fit">
        <NotificationBox
          title="Recipe creation failed"
          description="We couldn't create your recipe. Please try again later."
          secondaryCta={{ text: "Home", onClick: () => navigate("/") }}
        />
      </div>
    </div>
  );
};
