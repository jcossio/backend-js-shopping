// FOrma mas organizada de hacer esto en grphql
const resolver = {
  Query: {
    async productAll(_, params, { dataSources }) {
      let result = [];
      try {
        result = await dataSources.Product.find().exec();
      } catch (err) {
        console.log(err);
      }
      return result;
    }
  },
  Mutation: {
    async productCreate(_, { input }, { dataSources }) {
      let result = {};
      try {
        result = await dataSources.Product(input).Save();
      } catch (err) {
        console.log(err);
      }
      return result;
    }
  }
}

module.exports = resolver;
