import { useState, useEffect } from "react";
import Filter from "./interfaces";
import { GetStudentCities } from "../../store/actions/actions";
import { useActions } from "../useActions";

const useFilter = () => {
  const [filter, setFilter] = useState<Filter>({
    queryString: "",
    sort: "",
    city: "",
    page: 0
  });
  const actions = useActions({ GetStudentCities });

  useEffect(() => {
    console.log("update");
    console.log(filter.page);
    filter.sort && actions.GetStudentCities(filter);
  }, [filter]);

  return {
    filter,
    setFilter
  };
};

export default useFilter;
