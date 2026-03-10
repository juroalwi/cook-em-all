import axios from "axios";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiets } from "../../hooks/useDiets";
import { useScreenSize } from "../../hooks/useScreenSize";

const validate = (field, value) => {
  switch (field) {
    case "title":
      if (!value) return "Title is required";
      if (/^\s*$/.test(value)) return "Invalid title";
      break;
    case "summary":
      if (!value) return "Summary is required";
      if (/^\s*$/.test(value)) return "Invalid summary";
      break;
    case "score": {
      const scoreRegex = /^0*([0-5](\.[0-9]*)?$)/;
      if (!value) return "Score is required";
      if (!scoreRegex.test(value)) return "Score must be between 0 and 5";
      break;
    }
    case "healthScore": {
      const healthScoreRegex = /^0*(([0-9][0-9]?)|(100))(\.[0-9]*)?$/;
      if (!value) return "Health score is required";
      if (!healthScoreRegex.test(value) && value !== "")
        return "Health score must be between 0 and 100";
      break;
    }
    default:
      return "";
  }
};

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();
  const { diets } = useDiets();
  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    score: "",
    healthScore: "",
  });
  const [values, setValues] = useState({
    title: "",
    summary: "",
    score: "",
    healthScore: "",
    instruction: "",
    instructions: [],
    diets: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, summary, score, healthScore, instructions, diets } = values;
    try {
      const result = await axios({
        method: "post",
        url: "/recipes/create",
        headers: {},
        data: {
          title,
          summary,
          score: score * 20,
          healthScore,
          instructions,
          diets,
        },
      });
      navigate(`/recipe/detail/${result.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setValues(() => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((e) => ({
      ...e,
      [event.target.name]: validate(event.target.name, event.target.value),
    }));
  };

  const handleAddInstruction = () => {
    setValues({
      ...values,
      instruction: "",
      instructions: [...values.instructions, values.instruction],
    });
  };

  const handleRemoveInstruction = (removedIndex) => {
    setValues({
      ...values,
      instructions: values.instructions.filter(
        (_instruction, index) => index !== removedIndex,
      ),
    });
  };

  const handleToggleDiet = (diet) => {
    const index = values.diets.indexOf(diet);
    setValues({
      ...values,
      diets:
        index !== -1
          ? values.diets.filter((selectedDiet) => selectedDiet !== diet)
          : [...values.diets, diet],
    });
  };

  return (
    <div
      className={twMerge(
        "max-w-250 lg:mx-auto lg:my-16",
        !isMobile && "light-shadow-small rounded-sm",
      )}
    >
      <div className="flex w-full flex-col gap-2 p-8 lg:gap-4">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:gap-8">
          <div className="flex w-full max-w-150 flex-col gap-2">
            <Label>title</Label>
            <Input name="title" value={values.title} onChange={handleChange} />
            <Error message={errors.title} />
          </div>

          <div className="flex items-start gap-8 max-[440px]:flex-col max-[440px]:gap-2">
            <div className="flex w-full max-w-50 flex-col gap-2">
              <Label>score</Label>
              <StarRating
                value={parseFloat(values.score) || 0}
                onChange={(rating) =>
                  handleChange({
                    target: { name: "score", value: rating.toString() },
                  })
                }
              />
              <Error message={errors.score} />
            </div>

            <div className="flex w-full max-w-50 flex-col gap-2">
              <Label>health</Label>
              <HealthRating
                value={parseFloat(values.healthScore) || 0}
                onChange={(rating) =>
                  handleChange({
                    target: {
                      name: "healthScore",
                      value: Math.max(
                        0,
                        Math.min(100, Math.round(rating)),
                      ).toString(),
                    },
                  })
                }
              />
              <Error message={errors.healthScore} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label>diets</Label>
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {diets.map((diet, i) => {
              const active = values.diets.includes(diet);
              return (
                <div
                  key={i}
                  onClick={() => handleToggleDiet(diet, i)}
                  className={twMerge(
                    "cursor-pointer rounded-full border px-2 py-0.5 text-xs font-medium tracking-wide transition-all hover:opacity-90 lg:px-4 lg:py-1 lg:text-sm",
                    active
                      ? "border-custom-white bg-custom-white text-custom-red"
                      : "text-custom-white/80 border-custom-white/40",
                  )}
                >
                  {diet}
                </div>
              );
            })}
          </div>
        </div>

        <div />

        <div className="flex flex-col gap-2">
          <Label>SUMMARY</Label>
          <TextArea
            name="summary"
            value={values.summary}
            onChange={handleChange}
            className="h-40"
          />
          <Error message={errors.summary} />
        </div>

        <div />

        <div className="flex flex-col gap-2">
          <Label>add instruction</Label>
          <div className="flex h-11 items-stretch gap-4">
            <TextArea
              name="instruction"
              value={values.instruction}
              onChange={handleChange}
              className="h-full"
            />
            <SmallButton
              type="button"
              onClick={handleAddInstruction}
              disabled={!values.instruction.length}
              className="aspect-square h-full"
            >
              +
            </SmallButton>
          </div>

          <div className="text-custom-white custom-scrollbar flex max-h-40 flex-col gap-3 overflow-y-auto p-4 text-sm">
            {values.instructions.map((inst, i) => (
              <div
                key={i}
                className="flex cursor-pointer items-center justify-start gap-4"
                onClick={() => handleRemoveInstruction(i)}
              >
                <SmallButton className="h-4 w-4 rounded-full lg:h-6 lg:w-6">
                  -
                </SmallButton>
                <span>{inst}</span>
              </div>
            ))}
          </div>
        </div>

        <div />

        <button
          onClick={handleSubmit}
          disabled={
            errors.title ||
            errors.summary ||
            errors.score ||
            errors.healthScore ||
            !values.title ||
            !values.summary ||
            !values.score ||
            !values.healthScore
          }
          className="bg-custom-red text-custom-black w-fit cursor-pointer self-end rounded-xs px-4 py-2 text-base font-semibold tracking-wider uppercase disabled:cursor-not-allowed disabled:opacity-60 lg:px-6 lg:py-2 lg:text-lg lg:font-bold"
        >
          let's cook
        </button>
      </div>
    </div>
  );
};

const Label = ({ children, className }) => {
  return (
    <label
      className={twMerge(
        "text-custom-white text-base font-semibold tracking-widest uppercase lg:text-lg",
        className,
      )}
    >
      {children}:
    </label>
  );
};

const Input = ({ name, value, onChange, className }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className={twMerge(
        "text-custom-white border-custom-white/40 focus:border-custom-white h-11 w-full rounded-xs border bg-transparent px-3 py-2 text-sm transition-all lg:text-base",
        className,
      )}
    />
  );
};

const TextArea = ({ name, value, onChange, className }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={twMerge(
        "text-custom-white custom-scrollbar focus:border-custom-white border-custom-white/40 h-[90px] w-full resize-none rounded-xs border bg-transparent px-3 py-2 text-sm transition-all lg:text-base",
        className,
      )}
    />
  );
};

const Error = ({ message }) => {
  return (
    <div
      className={twMerge(
        "text-xs tracking-wide text-red-400 transition lg:text-sm",
        message ? "opacity-100" : "opacity-0",
      )}
    >
      {message}
    </div>
  );
};

const StarRating = ({ value, onChange }) => {
  return (
    <div className="flex h-8 items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= value;
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => onChange(star)}
              className="text-2xl transition-all hover:scale-110 focus:outline-none"
            >
              <span className={isFilled ? "text-yellow-400" : "text-gray-600"}>
                ★
              </span>
            </button>
          );
        })}
      </div>
      <span className="text-custom-white/80 text-sm">({value}/5)</span>
    </div>
  );
};

const HealthRating = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div className="flex h-8 items-center gap-3">
      <div
        className={twMerge(
          "flex h-full w-[128px] items-center",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (!isDragging) return;
          const rect = e.currentTarget.getBoundingClientRect();
          onChange(((e.nativeEvent.offsetX - 10) / (rect.width - 20)) * 100);
        }}
      >
        <div className="bg-custom-white/20 relative h-2 w-[120px] rounded-full">
          <div
            className="absolute h-full rounded-full bg-green-500"
            style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          />
        </div>
      </div>

      <span className="text-custom-white/80 w-8 text-sm">{value}%</span>
    </div>
  );
};

const SmallButton = ({ onClick, disabled, className, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "bg-custom-white text-custom-black flex cursor-pointer items-center justify-center rounded-xs text-lg font-bold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
};
