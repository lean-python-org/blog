Title: Comprehensions are Common Python
Date: 2022-10-02 18:00
Category: Python
Tags: comprehensions, feedback, common python
Slug: comprehensions-are-common-python
Authors: Grant Paton-Simpson
Summary: List comprehensions, and other types of comprehensions such as set comprehensions, are such an important part of Python we should treat them as Common Python - that is, as a feature we should all know so we can basically read each other's work. Even though they are Common Python we should only use this compressed syntax when it is relatively easy to understand. The rule of thumb is that we should change to another approach if our comprehension becomes an _in_comprehension.

What has your experience of comprehensions been? Do you agree with this post? Do you disagree? Please comment below.

Overview
========

Comprehensions are well covered elsewhere so we'll only briefly introduce them below before making the specific points relevant to the When of Python. In summary, it will be argued that comprehensions are such an important part of Python we should treat them as Common Python but that we should only use this compressed syntax when it is relatively easy to understand.

Comprehensions
==============

List Comprehensions
-------------------

List comprehensions are a good starting point to explain the syntax and value of Python comprehensions. A common need in programming is to take a collection of items and return a modified or filtered collection. For example, maybe we want the square of every number in a list: `[1, 2, 3] => [1, 4, 9]`.

We could create this new list using a `for` loop:

```python
numbers = [1, 2, 3]
squares = []
for num in numbers:
    squares.append(num ** 2)
```

Or using `map` we could write:

```python
def square(x):
    return x ** 2

numbers = [1, 2, 3]
squares = map(square, numbers)
```

In pseudocode what we want is collect into a list the square of every item in the `numbers` list. In Python we can write code where the syntax is very similar to the pseudocode using a comprehension:

```python
## squares is a list of the square of every item in the numbers list
squares = [num ** 2 for num in numbers]
```

And if we want to only include numbers < 3 the syntax is still very similar to a simple pseudo code version of what is desired.

```python
## squares is a list of the square of every item in the numbers list
## if the number < 3
squares = [num ** 2 for num in numbers if num < 3]
```

Other Comprehensions
--------------------

Python 3 introduced other comprehensions including dictionary and set comprehensions. For example:

```python
names = [('Charles', 'George'), ('Camilla', 'Shand'), ('Charles', 'Dickens')]
unique_fnames = {fname for fname, _lname in names}
```

Comprehensions are Common Python
================================

Comprehensions are Common Python (see [Welcome to the When of Python](https://lean-python-org.github.io/blog/welcome-to-when-of-python.html)). This point was actually controversial in a Python mailing list debate in 2018. The objection to treating comprehensions as Common Python was that developers working with Python often come from other languages which don't have comprehension constructs. It was suggested that little would be lost avoiding their usage but the benefit would be that Rust developers, for example, could work on Python code without having to learn an unfamiliar concept.

Against this position I think comprehensions are an elegant, readable way of expressing simple tasks into relatively simple code (once the approach has been learned). For a defence of comprehensions I refer to Raymond Hettinger's classic talk on [Transforming Code into Beautiful, Idiomatic Python](https://youtu.be/OSGv2VnC0go?t=2755). Hettinger argues that we shouldn't break atoms of thought into subatomic particles. He advocates instead for concise, expressive one-liners where one logical line of code equals one sentence in English. We shouldn't cripple Python to keep it compatible with as many other languages as possible.

Certainly, comprehensions are very widespread in Python code, so we should include them in Common Python - that is, those features we should all know so we can basically read each other's work.

Note - just because we consider comprehensions Common Python and not Situational Python doesn't mean we shouldn't be thoughtful about when to use them and when not to.

Incomprehensions
================

Being one-liners (even if stretched over several lines) comprehensions can attract the same "cleverness" which plagues a lot of code. The desire to fit complexity into a single line can overwhelm concerns with readability, maintainability, and avoiding bugs. As a general rule of thumb, if a comprehension stops being easy to read, use an alternative approach instead e.g. a `for` loop or `map`. Note - Walrus operators in comprehensions should generally be viewed as "tricky" and not worth the cost.



