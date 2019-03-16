const datasource = require('./datasource')
const { typeDefs, resolvers } = require('./schema')

exports.onCreateSchema = ({ concatTypeDefs, mergeResolvers }) => {
  concatTypeDefs(typeDefs)
  mergeResolvers(resolvers)
}

exports.onCreateDataSources = ({ addDataSource }) => {
  addDataSource('LumensAPI', datasource)
}
