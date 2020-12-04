// import {
//   requestRecipesData,
//   receivedRecipesDataError,
//   receivedRecipesData,
// } from "../../reducers/actions";
// import { useSelector, useDispatch } from "react-redux";

// export const fetchRecipes = async (type) => {
//   const dispatch = useDispatch();

//   try {
//     const res = await fetch(`/diet/${type}`);
//     const json = await res.json();
//     console.log(json);
//     dispatch(receivedRecipesData({ recipes: json.data, type: `${type}` }));
//   } catch (error) {
//     dispatch(receivedRecipesDataError());
//     console.log(error.message);
//   }
// };
