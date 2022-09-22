Title: The When of Lambda
Date: 2022-09-22 08:00
Category: Python
Tags: python, lambda, pandas
Slug: the-when-of-lambda
Authors: Grant Paton-Simpson
Summary: Lambdas are a Python language feature we should provide clear guidance on. Used well they simplify code and are perfectly readable; used poorly, and code becames opaque and bug-prone. Although use should be restrained, an accommodation should be made for Pandas and sorting, albeit with caveats to ensure usage doesn't compromise readability. And a `=>` syntax could be nice.

What has your experience of lambda been? Do you agree with this post? Do you disagree? Please comment below.

Lambda Examples
===============

```python
lambda x: x**2
```

A lambda defines an anonymous, one-liner function which is usually very short. They are widely encountered in code and are idiomatic in at least two use cases:

1) Pandas e.g.
```python
.apply(lambda row: row['w'] * row['h'])
```
2) Sort e.g.
```python
sorted(users, key=lambda user: user['name'].lower())
```

When of Lambda
==============

So when should we use them? And when shouldn't we? In other words, can we create a When of Python for lambda? Trey Hunner's article [Overusing lambda expressions in Python](https://treyhunner.com/2018/09/stop-writing-lambda-expressions/) is highly relevant and I won't repeat all the great content in there. His main concern seems to be about the nameless nature of lambdas. Trey Hunner regularly teaches Python and places a high weight on readability. He makes a strong case that lambdas are overused and concludes with the following criteria:

> I’d say that using lambda expressions is acceptable only if your situation meets all four of these criteria:

>    1. The operation you’re doing is trivial: the function doesn’t deserve a name
>    2. Having a lambda expression makes your code more understandable than the function names you can think of
>    3. You’re pretty sure there’s not already a function that does what you’re looking for
>    4. Everyone on your team understands lambda expressions and you’ve all agreed to use them

I would agree with those principles but want to modify the fourth. Perhaps we would be better off accepting the two use cases described earlier (pandas and sorting) and concentrate on improving their use in that context.

Idiomatic Use Clarified
=======================

Pandas
------

Using Pandas requires understanding lambdas and being comfortable with them. But we should never make complex lambdas. The moment a lambda become at all difficult to understand we should make a proper named function and use that. 

> "If a function is important, it deserves a name" (Trey Hunner)

And we should at least hint at the meaning of variables we use. For example, if we are processing rows we could use `lambda row: row['height'] * 100` instead of `lambda x: x['height'] * 100`. Even `lambda r: r['height'] * 100` would be good, especially if `r` and `c` became idiomatic short-hands for row and column in such cases.

Sorting
-------

There is an alternative available using `itemgetter` but, to be honest, it is easier to use `lambda` and `lambda` is arguably more readable for most Python coders. Hunner presents the following comparison:

```python

# Without operator: accessing a key/index
rows_sorted_by_city = sorted(rows, key=lambda row: row['city'])

# With operator: accessing a key/index
from operator import itemgetter
rows_sorted_by_city = sorted(rows, key=itemgetter('city'))
```

but draws a different conclusion from myself on readability. I like the `lambda` better because it is arguably idiomatic.

Incidentally, imagine if Python had a different syntax for lambdas and we could write:

```python

# Without operator: accessing a key/index
rows_sorted_by_city = sorted(rows, key=(row => row['city']))
```

I guess it comes down to a matter of taste but I like the `=>` syntax. In the Pandas context it would be especially nice:

```python
.apply(x => x**2)

## vs

.apply(lambda x: x**2)
```

Conclusion
==========

Lambdas are a Python language feature we should provide clear guidance on. Used well they simplify code and are perfectly readable; used poorly, and code becames opaque and bug-prone. Although use should be restrained, an accommodation should be made for Pandas and sorting, albeit with caveats to ensure usage doesn't compromise readability. 
