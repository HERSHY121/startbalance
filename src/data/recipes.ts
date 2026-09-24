export type Recipe = {
  id: string
  title: string
  cost: 'Under £2' | 'Under £3' | 'Under £5'
  servings: string
  cardIngredients: string[]
  cupboardIngredients?: string[]
  method: string[]
}

export const recipes: Recipe[] = [
  {
    id: 'chickpea-tomato-stew',
    title: 'Chickpea & tomato stew',
    cost: 'Under £3',
    servings: 'Serves 2',
    cardIngredients: [
      '1 tin chickpeas, drained',
      '1 tin chopped tomatoes',
      '1 onion, diced',
      '1 carrot, diced',
      'A handful of frozen spinach',
    ],
    cupboardIngredients: ['Cumin or paprika, to taste'],
    method: [
      'Soften the onion and carrot in a pan with a splash of water.',
      'Add the tomatoes, chickpeas and seasoning, then simmer for 12–15 minutes.',
      'Stir in the spinach until hot and soft. Serve as a thick stew.',
    ],
  },
  {
    id: 'lentil-veg-dahl',
    title: 'Lentil & veg dahl-style bowl',
    cost: 'Under £3',
    servings: 'Serves 2',
    cardIngredients: [
      '100g red lentils',
      '1 tin chopped tomatoes',
      '200g frozen mixed vegetables',
      '1 onion, diced',
      'A splash of milk, optional',
    ],
    cupboardIngredients: ['Curry powder, to taste'],
    method: [
      'Rinse the lentils, then simmer them with the tomatoes, onion and 300ml water.',
      'Add the frozen vegetables and curry powder after 10 minutes.',
      'Cook until the lentils are soft. Stir through a splash of milk if you like.',
    ],
  },
  {
    id: 'bean-tomato-chilli',
    title: 'Three-bean tomato chilli',
    cost: 'Under £3',
    servings: 'Serves 3',
    cardIngredients: [
      '1 tin kidney beans, drained',
      '1 tin cannellini or black beans, drained',
      '1 tin chopped tomatoes',
      '1 onion, diced',
      'A handful of frozen peppers or sweetcorn',
    ],
    cupboardIngredients: ['Chilli powder or smoked paprika, to taste'],
    method: [
      'Cook the onion in a pan with a splash of water until softened.',
      'Add all the beans, tomatoes, vegetables and seasoning.',
      'Simmer for 15 minutes, stirring until thick and hot.',
    ],
  },
  {
    id: 'potato-leek-soup',
    title: 'Potato, leek & carrot soup',
    cost: 'Under £3',
    servings: 'Serves 3',
    cardIngredients: [
      '3 potatoes, peeled and chopped',
      '1 leek, sliced',
      '2 carrots, chopped',
      '400ml milk',
    ],
    cupboardIngredients: ['Black pepper or a stock cube, if you have it'],
    method: [
      'Put the potatoes, leek and carrots in a pan with water just covering them.',
      'Simmer for 18–20 minutes, until the vegetables are tender.',
      'Blend or mash, then stir in the milk and warm gently. Season if wanted.',
    ],
  },
  {
    id: 'potato-chickpea-bowl',
    title: 'Potato & chickpea bowl',
    cost: 'Under £2',
    servings: 'For 1–2',
    cardIngredients: [
      '2 potatoes, chopped',
      '1 tin chickpeas, drained',
      'A handful of frozen peas',
      '1 tomato, chopped',
      'A splash of milk, optional',
    ],
    cupboardIngredients: ['Black pepper or dried herbs, if you have them'],
    method: [
      'Boil the potatoes until tender, adding the peas for the last 3 minutes.',
      'Warm the chickpeas and chopped tomato in a second pan.',
      'Drain and crush the potatoes, then top with the chickpea mixture.',
    ],
  },
  {
    id: 'bean-veg-soup',
    title: 'Chunky bean & vegetable soup',
    cost: 'Under £3',
    servings: 'Serves 3',
    cardIngredients: [
      '1 tin cannellini beans, drained',
      '1 tin chopped tomatoes',
      '2 carrots, chopped',
      '1 stick celery, chopped',
      '200g frozen mixed vegetables',
    ],
    cupboardIngredients: ['Dried herbs or a stock cube, if you have them'],
    method: [
      'Add the carrots and celery to a pan with water and cook for 5 minutes.',
      'Stir in the tomatoes, beans, frozen vegetables and seasoning.',
      'Simmer for 15 minutes, adding water if you want a thinner soup.',
    ],
  },
  {
    id: 'spinach-pea-potato-mash',
    title: 'Spinach, pea & potato mash',
    cost: 'Under £2',
    servings: 'For 1–2',
    cardIngredients: [
      '2 potatoes, peeled and chopped',
      'A handful of frozen peas',
      'A handful of frozen spinach',
      'A splash of milk',
    ],
    cupboardIngredients: ['Black pepper, if you have it'],
    method: [
      'Boil the potatoes until tender, adding the peas for the last 3 minutes.',
      'Add the spinach for the final minute, then drain well.',
      'Mash everything with the milk and season if wanted.',
    ],
  },
  {
    id: 'sweetcorn-potato-soup',
    title: 'Sweetcorn & potato soup',
    cost: 'Under £2',
    servings: 'Serves 2',
    cardIngredients: [
      '2 potatoes, chopped',
      '1 tin sweetcorn, drained',
      '1 onion, diced',
      'A handful of frozen peas',
      '250ml milk',
    ],
    cupboardIngredients: ['Black pepper, if you have it'],
    method: [
      'Simmer the potatoes and onion in water until the potatoes are tender.',
      'Add the sweetcorn and peas and cook for 4 more minutes.',
      'Blend part of the soup, stir in the milk and warm gently.',
    ],
  },
  {
    id: 'tomato-lentil-spinach-soup',
    title: 'Tomato, lentil & spinach soup',
    cost: 'Under £3',
    servings: 'Serves 2–3',
    cardIngredients: [
      '100g red lentils',
      '1 tin chopped tomatoes',
      '1 carrot, grated',
      'A handful of frozen spinach',
      '1 onion, diced',
    ],
    cupboardIngredients: ['Cumin or dried herbs, if you have them'],
    method: [
      'Put the lentils, tomatoes, carrot, onion and 500ml water in a pan.',
      'Simmer for 18–20 minutes until the lentils are tender.',
      'Stir in the spinach and seasoning, then cook until hot.',
    ],
  },
  {
    id: 'fruit-milk-smoothie',
    title: 'Banana, berry & milk smoothie',
    cost: 'Under £2',
    servings: 'For 1–2',
    cardIngredients: [
      '1 banana',
      'A handful of fresh or frozen berries',
      '250ml milk',
    ],
    cupboardIngredients: ['Cinnamon, optional'],
    method: [
      'Add the banana, berries and milk to a blender or tall jug.',
      'Blend until smooth, or mash very well and shake in a lidded jar.',
      'Add cinnamon if you have it and serve straight away.',
    ],
  },
]
