Title: Get the Hint - Type Hinting is Common Python
Date: 2022-09-13 06:00
Category: Python
Tags: python, types, type hint
Slug: type-hinting-get-the-hint
Authors: Grant Paton-Simpson (featuring Danny Adair)
Summary: How we handle type hinting will define the future of Python for good or bad. Type hinting is useful as glorified commenting and as such should be part of everyone's Everyday Python. It should be part of Common Python. Type hinting is likely to be widely used in the code people encounter so we all need to be comfortable reading simple type hinting. Some enterprise and library codebases will benefit from a more strict and enforced form of type "hinting" and further advances in type hinting and checkers like mypy will improve the developer experience of using this feature. What has your experience of type hinting been? Do you agree with this post? Do you disagree? Please comment below.

What has your experience of type hinting been? Do you agree with this post? Do you disagree? Please comment below.

Type Hinting - A Big Deal for Python?
=====================================

Some new features really define the future of a programming language. Long after the walrus operator has been forgotten, and structural pattern matching found its niche, type hinting will be shaping people's everyday Python - for better or worse. A lot depends on how we agree to use this language feature.

Currently, almost a third of active Python projects on Github are using type hinting for parameters (see [The When of Python - KiwiPycon 2022](https://lean-python-org.github.io/kiwipycon2022/#/52/0/11)). The sooner we figure out type hinting best practice the better.

To kick this blog post off I contacted Danny Adair - founder and former President of NZPUG - to get some tentative thoughts. I knew he had opinions on type hinting based on a conversation we had at the recent Kiwi PyCon. Knowing Danny was currently extra busy I asked for a quick reaction and here it is:

> I think type hinting in Python can be useful, particularly if you (previously) enjoy(ed) the coziness of the harness that is static typing, and you're willing to sacrifice a duck for it.

> I think there are some codebases that were screaming for it (like the one at Dropbox where Guido started pimping it) but I would argue against it as becoming a habit. Unfortunately "optional" stops being optional for all practical purposes once you touch type hinted code with your code.

> "There should be one-- and preferably only one --obvious way to do it." - But don't worry it's optional...

> (How's that for a rant)

Some important questions are raised about type hinting. Should it be restricted to a few enterprise codebases? Should it be a matter of personal taste - perhaps we should accept type hinting as an option for those who are happy to embrace the restrictions of a static typing approach but recommend against it generally? Can this be a matter of personal taste or is there a risk type hinting will draw everything in - potentially spoiling the dynamic, duck-typed flavour of Python which has been part of its success?

I'll invite Danny to add further comment when this post is published. But let's step back a bit now and refresh our memories on how type hinting works and different ways of using it.

Different Ways of Type Hinting
==============================

Type hinting allows us to indicate what types a function expects as arguments and what types it will return. E.g.

```python
def get_greeting(name: str, age: int) -> str:
```

As the name makes clear, type hints are hints only but there are tools that enable type hinting to be checked and enforced.

Type hinting is still maturing in Python and more recent versions are less verbose and more readable e.g. `int | float` rather than `typing.Union[int, float]`

Initially I didn’t like type hinting. I suspected it was a costly and ritualistic safety behaviour rather than a way of writing better code. And people can certainly use type hinting like that. But I have changed my overall position on Python type hinting.

There are at least three ways to use type hinting in Python:

1) As Glorified Comments
------------------------

We can use type hinting to improve readability and reduce confusion - basically to treat type hints like glorified comments. For example, what is the following function expecting for the date parameter?

```python
def myfunc(date):
```

Is it OK if I supply date as a number (20220428) or must it be a string ("20220428") or maybe a datetime.date object? Type hinting can remove that confusion

```python
def myfunc(date: int):
```

It is now much more straightforward to consume this function and to modify it with confidence. I strongly recommend using type hinting like this.

The following is very readable in my view:

```python
def get_data(date: int, *, show_chart=False) -> pd.DataFrame:
```

Note: there is no need to add `: bool` when the meaning is obvious (unless wanting to use static checking as discussed below). It just increases the noise-to-signal ratio in the code.

```python
def get_data(date: int, *, show_chart: bool=False) -> pd.DataFrame:
```
On a similar vein, if a parameter obviously expects an integer or a float I don’t add a type hint. For example type hinting for the parameters below reduces readability for negligible practical gain:

```python
def create_coord(x: int | float, y: int | float) -> Coord:
```
Or, knowing that mypy considers int a subtype of float:

```python
def create_coord(x: float, y: float) -> Coord
```

Instead

```python
def create_coord(x, y) -> Coord:
```
is probably the right balance. To some extent it is a matter of personal taste.

I hope people aren’t deterred from using basic type hinting to increase readability by the detail required to fully implement type hinting.

2) To Enable Static Checking
----------------------------

Another option is to use type hinting to enable static checks with the aim of preventing type-based bugs – which potentially makes sense when working on a complex code base worked on by multiple coders. I doubt we should do the same for ordinary scripts – the costs can be very high (see endless Stack Overflow questions on Type Hinting complexities and subtleties).

3) Ritual Self-Soothing
-----------------------

For some people I suspect type hinting is a ritual self-soothing behaviour which functions to spin out the stressful decision-making parts of programming. Obviously I am against this especially when it makes otherwise beautiful, concise Python code “noisy” and less readable.

Duck Typing
===========

Time for a Duck Sacrifice?
--------------------------

Danny's comment on duck sacrifice may be puzzling for some. To start with, it has nothing to do with duck punching as per [Monkey patching and Duck punching](http://twentyfivetwenty.ca/monkey-patching-and-duck-punching) ;-). The issue is whether we lose or weaken the duck typing aspect of Python if we let type hinting spread too freely.

Python follows a Duck Typing philosophy – we look for matching behaviour not specific types. If it walks like a duck and quacks like a duck it’s a duck!

For example, we might not care whether we get a tuple or a list as long as we can reference the items by index. Returning to the Duck illustration, we don’t test for the DNA of a Duck (its type) we check for behaviours we’ll rely on e.g. can it quack?

There are pros and cons to every approach to typing but I like the way Python’s typing works: strong typing (`1 != '1'`); dynamic typing (defined at run-time); and duck typing (anything as long as it quacks).

Fortunately, no duck sacrifice is necessary if we mainly use type hinting as glorified comments and, in the context of more disciplined static type checking, rely on Protocol to allow behaviour-based (structural) hinting.

Structural Type Hinting using Protocol
--------------------------------------

If we were able to blend type hinting with duck typing we would get something where we could specify accepted types based on the behaviours they support.

Fortunately this is very easy in Python using Protocol. Below I contrast Nominal Type Hinting (based on the names of types) with Structural Type Hinting (based on internal details of types e.g. behaviours / methods)

```python
Full Example in Code

from typing import Protocol

class BaseAttacker:
    def attack(self):
       raise NotImplementedError

class Soldier(BaseAttacker):
    def __init__(self, name):
        self.name = name
    def attack(self):
        print(f"Soldier {self.name} swings their sword!")

class Archer(BaseAttacker):
    def __init__(self, name):
        self.name = name
    def attack(self):
        print(f"Archer {self.name} fires their arrow!")

class Catapult:  ## note - not inheriting from BaseAttacker
    def __init__(self, name):
        self.name = name
    def attack(self):
        print(f"Catapult {self.name} hurls their fireball!")

## only accept instances of BaseAttacker (or its subclasses)
def all_attack_by_type(units: list[BaseAttacker]):
    for unit in units:
        unit.attack()

s1 = Soldier('Tim')
s2 = Soldier('Sal')
a1 = Archer('Cal')
c1 = Catapult('Mech')

all_attack_by_type([s1, s2, a1])

## will run but won't pass static check
## because c1 not an BaseAttacker instance
## (or the instance of a subclass)

## comment out next line if checking with mypy etc - will fail
all_attack_by_type([s1, s2, a1, c1])

class AttackerProtocol(Protocol):
    def attack(self) -> None:
        … ## idiomatic to use ellipsis

def all_attack_duck_typed(units: list[AttackerProtocol]):
    for unit in units:
        unit.attack()

## will run as before even though c1 included
## but will also pass a static check
all_attack_duck_typed([s1, s2, a1, c1])
```

Unexpected Conclusion
=====================

Type hinting is useful as glorified commenting and as such should be part of everyone's Everyday Python. In other words it should be part of Common Python. Type hinting is likely to be widely used in the code people encounter (see earlier comment on usage in Python projects on Github) so we all need to be comfortable reading simple type hinting.

Some enterprise and library codebases will benefit from a more strict and enforced form of type "hinting" and further advances in type hinting and checkers like mypy will improve the developer experience of using this feature.

The dynamic flavour of Python can be maintained by using type hinting in this way and by making use of Protocol. No duck sacrifice is necessary.

If we use type hinting to improve the readability of our Python code generally, and to increase the robustness of enterprise and library code specifically; and if we can avoid using type hinting to make Python less flexible and Just Another Static Language, then type hinting will be a great addition to the language.
