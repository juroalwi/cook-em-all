import axios from "axios";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiets } from "src/hooks/useDiets";
import { Slider } from "src/components/Slider";
import { Tag } from "src/components/Tag";
import { StarRating } from "src/components/StarRating";
import { Tooltip } from "src/components/Tooltip";
import { Loading } from "src/components/Loading";
import { CreationError } from "./CreationError";

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const { diets } = useDiets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreationError, setIsCreationError] = useState(false);
  const [instructionDraft, setInstructionDraft] = useState("");
  const [form, setForm] = useState({
    title: "",
    summary: "",
    stars: 0,
    healthScore: 0,
    instructions: [],
    diets: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const result = await axios({
        method: "post",
        url: "/recipes/create",
        headers: {},
        data: {
          title: form.title,
          summary: form.summary,
          score: form.stars * 20,
          healthScore: form.healthScore,
          instructions: form.instructions,
          diets: form.diets,
        },
      });
      navigate(`/recipe/detail/${result.data.id}`);
    } catch {
      setIsCreationError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormUpdate = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isSubmitting) {
    return <Loading />;
  }

  if (isCreationError) {
    return <CreationError />;
  }

  return (
    <div className="mx-4 my-8 lg:mx-8 lg:my-12">
      <div className="light-shadow mx-auto flex w-full max-w-250 flex-col gap-2 rounded-xs p-8 lg:gap-4">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:gap-8">
          <div className="flex w-full max-w-150 flex-col gap-2">
            <Label>title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={(e) => handleFormUpdate("title", e.target.value)}
            />
          </div>

          <div className="flex items-start gap-8 max-[440px]:flex-col max-[440px]:gap-2">
            <div className="flex w-full max-w-50 flex-col gap-2">
              <Label>stars</Label>
              <StarRating
                value={form.stars || 0}
                onChange={(rating) => handleFormUpdate("stars", rating)}
              />
            </div>

            <div className="flex w-full max-w-50 flex-col gap-2">
              <Label>healthy</Label>
              <Slider
                value={form.healthScore || 0}
                onChange={(rating) =>
                  handleFormUpdate(
                    "healthScore",
                    Math.max(0, Math.min(100, Math.round(rating))),
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label>diets</Label>
          <div className="flex flex-wrap gap-2">
            {diets.map((diet) => {
              const isOn = form.diets.includes(diet);
              return (
                <Tag
                  key={diet}
                  name={diet}
                  isOn={isOn}
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      diets: isOn
                        ? form.diets.filter((d) => d !== diet)
                        : [...form.diets, diet],
                    }));
                  }}
                />
              );
            })}
          </div>
        </div>

        <div />

        <div className="flex flex-col gap-2">
          <Label>summary</Label>
          <TextArea
            name="summary"
            value={form.summary}
            onChange={(e) => handleFormUpdate("summary", e.target.value)}
          />
        </div>

        <div />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>add instruction</Label>

            <div className="flex gap-4">
              <Input
                name="instruction"
                value={instructionDraft}
                onChange={(e) => setInstructionDraft(e.target.value)}
              />
              <SmallButton
                type="button"
                onClick={() => {
                  setInstructionDraft((v) => {
                    handleFormUpdate("instructions", [...form.instructions, v]);
                    return "";
                  });
                }}
                disabled={instructionDraft.length === 0}
                className="aspect-square h-8 lg:h-10"
              >
                +
              </SmallButton>
            </div>
          </div>

          <div className="text-custom-white custom-scrollbar flex max-h-40 flex-col gap-1 overflow-x-hidden overflow-y-auto text-xs lg:text-sm">
            {form.instructions.map((inst, index) => (
              <div
                key={index}
                className="flex items-start justify-start gap-2 p-1 lg:gap-3"
              >
                <SmallButton
                  onClick={() => {
                    handleFormUpdate(
                      "instructions",
                      form.instructions.filter((_, i) => i !== index),
                    );
                  }}
                  className="aspect-square h-4 lg:h-5"
                >
                  -
                </SmallButton>

                <p className="no-scrollbar max-h-12 overflow-y-scroll break-all">
                  {inst}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div />

        <Tooltip text={!form.title ? "Title is required" : ""}>
          <button
            onClick={handleSubmit}
            disabled={!form.title}
            className="bg-custom-red text-custom-black mt-2 w-fit cursor-pointer self-end rounded-xs px-4 py-2 text-base font-semibold tracking-wider uppercase disabled:cursor-not-allowed disabled:opacity-60 lg:px-6 lg:py-2 lg:text-lg lg:font-bold"
          >
            let's cook
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

const Label = ({ children, className }) => {
  return (
    <label
      className={twMerge(
        "text-custom-white text-sm font-medium tracking-widest uppercase lg:text-base lg:font-semibold",
        className,
      )}
    >
      {children}
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
        "text-custom-white border-custom-white/40 focus:border-custom-white h-8 w-full rounded-xs border bg-transparent px-2 text-sm transition-all lg:h-10 lg:px-3 lg:text-base",
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
        "text-custom-white custom-scrollbar focus:border-custom-white border-custom-white/40 h-10 w-full resize-none rounded-xs border bg-transparent p-2 text-sm transition-all lg:h-35 lg:p-3 lg:text-base",
        className,
      )}
    />
  );
};

const SmallButton = ({ onClick, disabled, className, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "bg-custom-white text-custom-black flex cursor-pointer items-center justify-center rounded-full text-lg font-bold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
};
