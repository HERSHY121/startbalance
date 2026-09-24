import { useState } from 'react'
import { DisclaimerBadge } from '../components/DisclaimerBadge'
import { recipes } from '../data/recipes'

export function RecipesScreen() {
  const [openRecipe, setOpenRecipe] = useState<string | null>(null)

  return (
    <div className="screen recipes-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">Healthy Start ideas</p>
          <h1 className="screen-title">Recipes</h1>
        </div>
        <DisclaimerBadge />
      </header>

      <section className="recipes-intro" aria-label="About these recipes">
        <p>
          Simple recipes using foods you can buy with Healthy Start. StartBalance
          is not affiliated with the NHS.
        </p>
      </section>

      <div className="recipe-list">
        {recipes.map((recipe) => {
          const isOpen = openRecipe === recipe.id
          return (
            <article className={`recipe-card${isOpen ? ' is-open' : ''}`} key={recipe.id}>
              <button
                type="button"
                className="recipe-toggle"
                aria-expanded={isOpen}
                aria-controls={`${recipe.id}-details`}
                onClick={() => setOpenRecipe(isOpen ? null : recipe.id)}
              >
                <span className="recipe-heading">
                  <strong>{recipe.title}</strong>
                  <span className="recipe-meta">
                    <span className="recipe-cost">{recipe.cost}</span>
                    <span>{recipe.servings}</span>
                  </span>
                </span>
                <span className="recipe-chevron" aria-hidden="true">
                  {isOpen ? '⌃' : '⌄'}
                </span>
              </button>

              {isOpen && (
                <div className="recipe-details" id={`${recipe.id}-details`}>
                  <p className="recipe-fit">
                    Fits Healthy Start shopping: the card items are eligible fruit,
                    vegetables, pulses or milk.
                  </p>

                  <div className="recipe-ingredients">
                    <h2>Card-eligible ingredients</h2>
                    <ul>
                      {recipe.cardIngredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  {recipe.cupboardIngredients && (
                    <div className="recipe-cupboard">
                      <h2>From your cupboard (not on the card)</h2>
                      <p>{recipe.cupboardIngredients.join(' · ')}</p>
                    </div>
                  )}

                  <div className="recipe-method">
                    <h2>Method</h2>
                    <ol>
                      {recipe.method.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <p className="recipes-footer">
        Check the official Healthy Start guidance for current eligibility and card
        rules.
      </p>
    </div>
  )
}
