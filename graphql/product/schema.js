

// Esto es lo que puede solicitar el cliente
const schema = `
type Product {
  _id: ID!,
  name: String,
  description: String,
  price: Float,
  availableQuantity: Int,
  image: String
}

type ProductCreateInput {
  name: String!,
  description: String,
  price: Flaot,
  availableQuantity: Int!,
  image: String
}

type Query {
  productAll: [Product]
}

type Mutation {
  productCreate(input: ProductCreateInput): Product
}
`;

module.exports = schema;

