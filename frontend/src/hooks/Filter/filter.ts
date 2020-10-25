import { useState, useEffect } from "react";
import Filter from "./interfaces";
import { GetStudentCities } from "../../store/actions/actions";
import { useActions } from "../useActions";

const useFilter = () => {
  const [filter, setFilter] = useState<Filter>({
    queryString: "",
    sort: "",
    city: ""
  });
  const [page, setPage] = useState(0);
  const actions = useActions({ GetStudentCities });

  useEffect(() => {
    filter.sort && actions.GetStudentCities(page, filter);
  }, [page, filter]);

  return {
    filter,
    setFilter,
    page,
    setPage
  };
};

export default useFilter;
