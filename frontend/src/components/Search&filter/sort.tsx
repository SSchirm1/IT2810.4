import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import useFilter from "../../hooks/Filter/filter";

const Sort = () => {
  const { count, studentCities } = useSelector((state: RootState) => {
    return {
      count: state.studentCities.count,
      studentCities: state.studentCities.studentCities
    };
  });

  const { page, setPage } = useFilter();

  return (
    <div className="sfwrapper">
      <h3>Sort by:</h3>
      <button type="button">Alfabetisk</button>
      <button type="button">Rating</button>
      {studentCities.map(el => {
        return <button key={el.id}>{el.id}</button>;
      })}
      <button onClick={() => setPage(page + 1)}>+1!</button>
    </div>
  );
};
export default Sort;
