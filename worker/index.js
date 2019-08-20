import redis from "redis"
import keys from "./keys"

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

const sub = redisClient.duplicate()

const fib = (index) => {
  if (index < 2) return 1
  return fib(index - 1) + fib(index - 2)
}

sub.on("message", (channel, message) => {
  const fib_value = fib(parseInt(message))
  redisClient.hset("values", message, fib_value)
  console.log(`Fibonacci of ${message} is ${fib_value}`)
})

sub.subscribe("insert")
