import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        // console.log(data);
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2>Loading error! Please come back later. </h2>;
  }
  const {
    name,
    image,
    category,
    info,
    glass,
    instructions,
    ingredients,
  } = cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title"> {name}</h2>
      <div className="drink">
        <div className="animate__animated animate__fadeInLeft">
          <img src={image} alt={name} />
        </div>
        <div className="drink-info">
          <p>
            <span className="drink-data"> name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data"> category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data"> info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data"> glass :</span>
            {glass}
          </p>

          <p>
            <span className="drink-data"> ingredients :</span>
            {ingredients.map((ingredient, index) => {
              return ingredient ? <span key={index}>{ingredient} </span> : null;
            })}
          </p>
          <p>
            <span className="drink-data"> instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
