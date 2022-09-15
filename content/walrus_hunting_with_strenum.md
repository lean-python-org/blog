Title: Walrus Hunting with StrEnum
Date: 2022-09-14 20:00
Category: Python
Tags: python, walrus operator, enum, 3.11
Slug: walrus-hunting-with-strenum
Authors: Grant Paton-Simpson (with Ben Denham)
Summary: The Walrus operator finally seemed to have found a practical use case - as a way to make collections of strings or integers without as much boiler plate as the alternative without the operator. But Python has a better approach already - Enum - and in Python 3.11 it is even easier to use with strings (StrEnum). So the Walrus operator still struggles to find a problem for which it is the best solution.

What has your experience of the Walrus operator been? How about Enum and IntEnum? Do you agree with this post? Do you disagree? Please comment below.

Walrus Operator - Finally a Useful Use Case?
============================================

The Walrus Operator
-------------------

The Walrus operator is named because `:=` looks like the eyes and tusks of a walrus of its side. I really like the name[ref]I also like the way Ruby has the delightfully named spaceship operator `<=>` [Ruby — The Spaceship Operator 101](https://medium.com/@albert.s.chun/ruby-the-spaceship-operator-101-717b42566971)[/ref] so it is a shame the Walrus operator isn't a useful addition to Python. Instead, the Walrus operator seems to be a solution looking for a problem. In spite of all the blog posts and tweets illustrating how it works there is very little that tries to explain why it is better than alternative approaches (unless we assume opaque one-liners are better than readable two-liners ;-)).

As a quick reminder, the Walrus operator is an assignment expression. Normally we assign values to names with the syntax `name = value` e.g. `fname = 'Zac'`. The Walrus operator allows us to perform assignment as an inline expression within another statement. For example, instead of:

```python
fname = 'Zac'
print(fname)
```
we can save a line by writing:

```python
print(f_name := 'Zac')
```

This is not an obvious improvement - indeed it can be argued that the Walrus operator commonly makes Python less readable and increases the complexity of basic code for no payoff. But perhaps it has other higher-value use cases?

One suggestion concerns collections of constants.

Constants
---------

We often use "constants" to avoid magic numbers. E.g.

```python
PG_PORT = 5432

...

port=PG_PORT  ## more semantic than port=5432
```

We can also use them to identify strings that we wish to control as developer, sometimes in collections that cover available options. For example:

```python
AUCKLAND = 'Auckland'
WELLINGTON = 'Wellingon'
CHRISTCHURCH = 'Christchurch'
DUNEDIN = 'Dunedin'

CITIES = [
    AUCKLAND,
    WELLINGTON,
    CHRISTCHURCH,
    DUNEDIN,
]
```

Collections of Constants and the Walrus Operator
------------------------------------------------

Recently it has been suggested that the Walrus operator is a useful way of slimming down such constructs. Using the Walrus operator we can instead write:

```python
CITIES = [
    AUCKLAND := 'Auckland',
    WELLINGTON := 'Wellington',
    CHRISTCHURCH := 'Christchurch',
    DUNEDIN := 'Dunedin',
]
```

While it is true that, in this case, the Walrus operator saves multiple lines and avoids duplication, there are better ways of achieving the same results. It would probably be better to use an enum to collect these strings together.

StrEnum - A Valuable Addition
=============================

StrEnum is part of Python 3.11[ref]It has been possible to use string Enums since 3.4 but it is even easier now that StrEnum has been added.[/ref] and it enables the following syntax:

```python
from enum import StrEnum

class City(StrEnum):
    AUCKLAND = 'Auckland'
    WELLINGTON = 'Wellington'
    CHRISTCHURCH = 'Christchurch'
    DUNEDIN = 'Dunedin'
```
We can then refer to individual cities using dot notation e.g.

```python
if city == City.AUCKLAND:
    pass
```

The following is `True`:

```python
'Auckland' == City.AUCKLAND
```

We can also combine our StrEnum nicely with type hinting to clarify what sorts of strings we expect to receive in a function:

```python
def arrange_travel(city: City):
    ...
```

This is arguably better than:

```python
def arrange_travel(city: str):
    ...
```

because it provides clear guidance about the type of inputs expected.

StrEnums also play nicely in other contexts - for example, as dictionary keys. The following works:

```python
city_popns = {
    City.AUCKLAND: 1_571_700,
    City.WELLINGTON: 202_700,
    City.CHRISTCHURCH: 369_000,
    City.DUNEDIN: 126_300,
}
## Both return 1_571_700
city_popns[City.AUCKLAND]
city_popns['Auckland']

```

Using StrEnum Like a Ruby Symbol
================================

Ruby has a construct called a symbol. It's a string that is identified by a colon at the front of a variable name e.g. `:fname`. The usage is subtle but important - basically "if the textual content of the object is important, use a String. If the identity of the object is important, use a Symbol." [Ruby Symbols vs. Strings](https://medium.com/@lcriswell/ruby-symbols-vs-strings-248842529fd9). The main benefit is clarity of programmer intention i.e. readability.

In Ruby another benefit of favouring symbols over strings is that they are interned - that is, there is only one instance no matter how many times it is used. This is much less relevant to Python. Most strings will be automatically be interned anyway - see [Optimization in Python — Interning](https://towardsdatascience.com/optimization-in-python-interning-805be5e9fd3e).

So for Python the real benefits of StrEnums are in readability and, potentially, type enforcement through type hinting. When we use a StrEnum we know it has a special meaning and is part of a controlled collection. We know that supplying any random string might not work - the code is expecting something from the type of StrEnum indicated.

When the Type of StrEnum Matters
================================

There are cases where the fact our StrEnum is not really a string matters. See [class enum.StrEnum](https://docs.python.org/3.11/library/enum.html#enum.StrEnum). The documentation suggests we can simply convert our StrEnum to a string type e.g. `str(City.AUCKLAND)`. Another approach is to provide a property to the StrEnum. E.g.

```python
class City(StrEnum):

    @property
    def str(self):  ## in case we ever need the actual string type
        return self.value

    AUCKLAND = 'Auckland'
    WELLINGTON = 'Wellington'
    CHRISTCHURCH = 'Christchurch'
    DUNEDIN = 'Dunedin'
```

Then we can write City.AUCKLAND.str instead if that is more to our taste.

StrEnums 1: Walrus Operator 0
=============================

In conclusion, the StrEnum is a new feature in Python we should start using a lot more. And if we do, it is even harder to think of cases where the Walrus operator is the best solution. Too harsh? Too kind? Add a comment.

Postscript - Testing StrEnum
============================

Docker can be a convenient way of experimenting with unreleased (or old) versions of Python. The following lets you run scripts in your current working folder using the version of Python in the container.

```bash
docker run --rm -it --mount type=bind,source="$(pwd)",target=/src --workdir /src python:3.11-rc /bin/bash
```
