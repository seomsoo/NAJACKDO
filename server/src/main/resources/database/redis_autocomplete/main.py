#-*- coding:utf-8 -*-
import redis

r = redis.StrictRedis(host='j11c105.p.ssafy.io', port=6379, db=0, password='najackdo')

f = open("./titles.txt","rt", encoding="utf-8")
for line in f:
  n = line.strip()
  for l in range(len(n)+1):
    prefix = n[0:l]
    r.zadd('autocomplete',{prefix : 0})
  r.zadd('autocomplete',{n+"*" : 0})
  r.zadd('score', {n:0})
  print(n+"*")
else:
  exit