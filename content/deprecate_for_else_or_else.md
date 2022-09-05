Title: Deprecate for else or else?
Date: 2022-09-05 21:00
Category: Python
Tags: python, for else
Slug: deprecate-for-else-or-else
Authors: Grant Paton-Simpson
Summary: The `for else` construct is arguably too confusing for most Python coders and there are simple alternatives that are safe and versatile. A clear candidate for deprecation.


The for else construct seems simple enough - the problem is that the correct interpretation of how it works is counterintuitive to a large proportion of Python coders. For example, which of the following is correct? It's not immediately obvious whether the else block runs if the break is hit, or if it is not hit.

```python
for animal in animals:
    if animal == my_pet:
        break
else:
    print("No pet is found :-(")

for animal in animals:
    if animal == my_pet:
        break
else:
    print("Pet found :-)")
```

Some suggestions for better names than else have included `nobreak` and (less seriously) `if_we_exited_the_block_without_encountering_a_break`.

In practice, it's clearer to just remove the ambiguity for the reader and set a variable before breaking.

```python
found_pet = False
for animal in animals:
    if animal == my_pet:
        found_pet = True
        break
if not found_pet:
    print('No pet found :(')
```

If Raymond Hettinger had a time machine he could tell Guido in the future no one will find `else` intuitive: [Transforming Code into Beautiful, Idiomatic Python](https://m.youtube.com/watch?v=OSGv2VnC0go). Incidentally this is one of the classic Python presentations - watch it and bump the views over from 999,975 to a clean 1M ;-)

Guido says if he had a time machine he would not have included the feature at all: [Python-ideas for/else syntax](https://mail.python.org/pipermail/python-ideas/2009-October/).

Maybe we should put `for else` in the **Deprecate Python** category? Why not - there are alternatives that are versatile, simple, and safe.

Fair comment? Overly harsh? What do you think?


