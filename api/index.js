import express from "express"
import cors from "cors"
import redis from "redis"
import { Pool } from "pg"

import keys from "./keys"

//Express server setup
const app = express()
app.use(cors())
app.use(express.json())

// PostGres client setup
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})

pgClient.on("error", () => console.log("Lost PG connection"))

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (NUMBER INT)")
  .catch((err) => console.log(err))

// Redis Client setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

const redisPublisher = redisClient.duplicate()

// Express route handlers
app.get("/", (req, res) => {
  res.send("Hi")
})

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values")
  res.send(values.rows)
  console.log(values.rows)
})

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values)
    console.log(values)
  })
})

app.post("/values", async (req, res) => {
  const index = req.body.index

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high")
  }

  redisClient.hset("values", index, "Nothing yet!")
  redisPublisher.publish("insert", index)

  pgClient.query("INSERT INTO values (number) values ($1)", [parseInt(index)])

  res.send({ working: true })
})

app.listen(5000, () => {
  console.log("Listening on port 5000")
})
