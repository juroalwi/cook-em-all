import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiets as fetchDietsAction } from "../redux/actions";

export default function useDiets() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const dietsStatus = useSelector((state) => state.dietsStatus);

  const fetchDiets = useCallback(function () {
    dispatch(fetchDietsAction());
  }, []);

  return {
    diets,
    fetchDiets,
    dietsStatus,
  };
}
