l = []
with open("list") as cn:
    for c in cn:
        code, name = c.strip().split(' ', 1)
        name = name.title()
        l.append([name, code])

l.sort()
with open('out', 'w') as out:
    for c in l:
        print(f'                        <option value="{c[1]}">{c[0]}</option>', file=out)