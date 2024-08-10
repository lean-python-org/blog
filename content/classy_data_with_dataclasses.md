Title: Classy Data with Dataclasses
Date: 2022-09-25 23:00
Category: Python
Tags: python, dataclasses, namedtuple
Slug: classy-data-with-dataclasses
Authors: Grant Paton-Simpson
Summary: Passing data around can easily become confusing. Dataclasses are a fantastic way of structuring and documenting our data and we should be using them a lot more. They are the only standard keyword-based data structure which can serve both our immutable and our mutable data needs. Maybe we should stop teaching `collections.namedtuple` and `typing.NamedTuple` and focus on making `dataclasses.dataclass`es as idiomatic, familiar, and readable as possible. It would be good to have One Obvious Way of creating keyword data structures.

What has your experience of dataclasses been? Do you agree with this post? Do you disagree? Please comment below.

Introduction
============

Passing data around can easily become confusing. Dataclasses are a fantastic way of structuring and documenting our data and we should be using them a lot more (see [Why You Should Use Data Classes in Python](https://www.giulianopertile.com/blog/why-you-should-use-dataclasses-in-python/)). Maybe we should stop teaching `collections.namedtuple` and `typing.NamedTuple` and focus on making `dataclasses.dataclass`es as idiomatic, familiar, and readable as possible. This article compares different approaches to creating data structures and concludes with examples of dataclasses used in conjunction with type hinting.

Passing Data Around With Confidence
===================================

Passing data around is reasonably easy in Python. The syntax for tuples, lists, dictionaries, and sets is clean and easy to learn. Passing data around without being confused or uncertain - that takes more care. For example, imagine we are passing around coordinate data with latitude, longitude, and a code for the type of coordinate system. We can do it in a positional way or with keywords. But which is easier to deal with? `(35, 35, 27200)` or `{'lat': 35, 'lon': 35, 'srid': 27200}`? Which approach is most likely to result in bugs? And which approach is going to cope easiest with extra items and reordered data? While there are cases where plain tuples are a good choice the moment readability is jeopardised we should use a data structure option with keywords. But which type of keyword data structure should we choose?

Dicts vs namedtuples vs NamedTuples vs Dataclasses
==================================================

Dictionaries are very flexibile and mutable - which is their greatest strength and their greatest weakness. When you receive a dictionary you can never be sure which keywords it will be using or whether it has been tampered with. Perhaps someone added the 'latitude' keyword and the dictionary is now:

`{'lat': 35, 'lon': 35, 'srid': 27200, 'latitude': 35}`

Dictionaries also require extra boilerplate to construct.

`Collections.namedtuple` provides a good solution where a dot notation is possible, keywords are fixed, data can (more often) be trusted, and yet it is possible to populate them in a lightweight way if that makes most sense. For example:

```python
from collections import namedtuple

Coord = namedtuple('Coord', 'lat, lon, srid')

## Lightweight usage
place_a = Coord(-36, 174, 4326)
place_b = Coord(-37, 175, 4326)

## More explicit usage (if so desired)
place_c = Coord(lat=-36, lon=175, srid=4326)
```

Better Handling of Defaults and Item Types
==========================================

`typing.NamedTuple` offers an even better approach with a very readable syntax. E.g.

```python
class Coord(NamedTuple):
    lat: float
    lon: float
    srid: int = 4326
```

If you are working with a `typing.NamedTuple` Coord in your code it is very easy to see just what you are dealing with and to reason about it. Merely hovering over a type hint or instantiation will be enough to understand what data you are receiving / passing without having to lose focus on the actual coding.

It is hard to overstate how valuable this in when passing around non-trivial data structures. It also proves its worth when changing the details of your data structure - it is very easy to introduce bugs when changes aren't propagated successfully throughout the code. Having a clearly defined (and discoverable) structure makes it easy to search for uses and make consistent changes with confidence.

Type Hinting and Data Types
===========================

Type Hinting
------------

Type hinting is an important part of modern Python - whether used as glorified comments or for stricter static type checking purposes (see [Get the Hint - Type Hinting is Common Python](https://lean-python-org.github.io/blog/type-hinting-get-the-hint.html). Used judiciously it can make code much more readable.

For example, which is easier to understand - a function definition without type hinting:

```python
def create_map(coords):
    ...
```

or a definition with hinting:

```python
def create_map(coords: Sequence[Coord]) -> str:
    ...
```

In the case where hinting is used we can hover over `Coord` in our IDE and see precisely what we should expect including keywords to use and types.

Note - this is not an argument for type hinting everything all of the time. That is a separate debate. The point here is that type hinting, combined with a readable type of data structure, can make code much safer and more pleasant to work with.

Why Dataclasses?
----------------

This is a fair question - `typing.NamedTuple` is a very good solution - so why do we need dataclasses? In some ways it is a close call and initially I concluded that we didn't in most cases [ref][Python Named Tuples vs Data Classes](http://p-s.co.nz/wordpress/python-named-tuples-vs-data-classes/)[/ref]. There are some good arguments for using named tuples in some cases as explained in [namedtuple in a post-dataclasses world](https://death.andgravity.com/namedtuples). But I've changed my mind more recently because of the need to constrict Python for all the reasons covered in the [original When of Python talk](https://www.youtube.com/watch?v=JnY5MEiqG44). The unique benefit of dataclasses is that we can use them for all our keyword data structure needs - whether mutable or immutable. This is not true of named tuples. We can also focus our teaching / learning efforts on using dataclasses and using them well. We can forget about `collection.namedtuple`'s approach to default arguments and its different ways of defining fields. We can forget about remembering the difference between `namedtuples` and `NamedTuples`.  We can forget about the sometimes subtle differences between `dataclasses.dataclass` and `typing.NamedTuple`[ref]For example, no special function is needed to unpack or iterate over named tuples[/ref]. In short, we can ensure there is One Obvious Way of creating keyword data structures.

Note - depending on how they're used[ref]Vanilla dataclasses can't be unpacked or iterated over without special functions so code relying on that will break without other modifications[/ref] it may not be too hard to swap out `typing.NamedTuple`s for `dataclasses.dataclass`es:

```python
## typing.NamedTuple
class Coord(NamedTuple):
    lat: float
    lon: float
    srid: int = 4326

## dataclasses.dataclass
@dataclass(frozen=True)
class Coord:
    lat: float
    lon: float
    srid: int = 4326
```

Bringing it Together
====================

Type hinting with dataclasses makes it very easy to know what data functions expect and what data they'll produce in a way that tuples, lists, dictionaries, and sets do not.

To illustrate:

```python
from dataclasses import dataclass
from typing import Sequence

WGS84 = 4326

@dataclass(frozen=True)
class Coord:
    lat: float
    lon: float
    srid: int = WGS84

...

## Hundreds of lines of code later, or in another module

coords = []
for latitude, longitude in data:
    ## When writing this code I know which keywords I have to play with
    ## I just hover over Coord and everything is very clear
    coords.append(Coord(lat=latitude, lon=longitude, srid=WGS84))

...

def make_map(Sequence[Coord]):
    for coord in coords:
        if coord.srid != WGS84:
            raise ValueError(
                f"Unexpected SRID - got {coord.srid} instead of {WGS84}")
```

Maybe we should stop teaching `collections.namedtuple` and `typing.NamedTuple` and focus on making `dataclasses.dataclass`es as idiomatic, familiar, and readable as possible. There are big benefits for the Python community in having One Obvious Way of creating keyword data structures. For all the reasons covered in the article, dataclasses are a classy way of working with data.



