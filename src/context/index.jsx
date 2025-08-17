import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([])

  const navigate = useState()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate('/')
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
  function handleAddToFavorite(getCurrentItem){
    console.log(getCurrentItem);
    let copyFavoriteList = [...favoritesList];
    const index = copyFavoriteList.findIndex(item=>item.id === getCurrentItem.id)

    if(index === -1){
      copyFavoriteList.push(getCurrentItem)
    }else{
      copyFavoriteList.splice(index)
    }
    setFavoritesList(copyFavoriteList)
  }
  console.log(favoritesList,'favoritesList');
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
