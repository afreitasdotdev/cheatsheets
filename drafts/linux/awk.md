
# AWK

### Get line with number correspondings

```
awk '{if(NR==2) print $0}'
```

E.G.:
``` cat file.txt
I love linux
This is most powerfull 
Operational System
```

```
cat file.txt | awk '{if(NR==2) print $0}'
This is most powerfull 
```