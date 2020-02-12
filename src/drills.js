require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function searchByText(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}`)
    .then(result => {
      console.log(result)
    })
}

searchByText('facon')

function getPaginated(pageNumber) {
  const productsPerPage = 6
  const offset = productsPerPage * (pageNumber - 1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

getPaginated(2);

function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added', '>',
      knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result)
    })
}

productsAddedDaysAgo(4);

function getCost() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .groupBy('category')
    .sum('price')
    .then(result => {
      console.log(result)
    })
}

getCost();