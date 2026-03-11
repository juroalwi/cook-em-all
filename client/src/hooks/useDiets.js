import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiets as fetchDietsAction } from "src/redux/actions";

export const useDiets = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const dietsStatus = useSelector((state) => state.dietsStatus);

  const fetchDiets = useCallback(() => {
    dispatch(fetchDietsAction());
  }, []);

  return {
    diets,
    fetchDiets,
    dietsStatus,
  };
};
