var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

const app = express()

var schema = buildSchema(`
  type Query {
    hello: String,
    foo: String
  }
`)

var root = {
  hello: () => {
    return "Hello world!"
  },
  foo: () => {
    return "Bar!"
  },
}

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))