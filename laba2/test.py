import redis

r = redis.Redis(host='127.0.0.1', port=6379)

str_data = {
    "name": "text",
    "str": "privet",
    "anek": "cho kak?"
}

r.hmset("string", str_data)

list_data = ["item1", "item2", "item3"]

r.rpush("list", *list_data) 

set_data = {"one", "two", "three"}

r.sadd("set", *set_data)

print(f'str: {r.hgetall("string")}')
print(f'list: {r.lrange("list", 0, -1)}')
print(f'set: {r.smembers("set")}')
