Title: The Walrus and the (Software) Carpenter
Date: 2022-09-18 10:00
Category: Python
Tags: python, walrus operator
Slug: the-walrus-and-the-software-carpenter
Authors: Grant Paton-Simpson (with Ben Denham)
Summary: The Walrus operator encourages buggy code by conflating assignment with evaluation. PHP stands as a warning as to where this can lead. There are few, if any, cases where the convenience of the Walrus operator outweigh its risks. From a When of Python view, it should be Deprecated Python, or possibly Situational Python with very few situations accepted. The Walrus will almost never belong in production code.

What has your experience of the Walrus operator been? Do you agree with this post? Do you disagree? Please comment below.

The Walrus and the Carpenter - Lewis Carroll
============================================

> ...
*<br><br>The Walrus and the Carpenter
<br>    Were walking close at hand;
<br>They wept like anything to see
<br>    Such quantities of sand:
<br>If this were only cleared away,'
<br>    They said, it would be grand!'
<br>...
<br><br>Lewis Carroll - Through the Looking Glass*

![Walrus and the Carpenter - illustrator John Tenniel](images/walrus_and_carpenter.jpg)

The Walrus
==========

The Walrus operator is an assignment expression. Normally we assign values to names with the syntax `name = value` e.g. `fname = 'Zac'`. The Walrus operator allows us to perform assignment as an inline expression within another statement. For example, instead of:

```python
fname = 'Zac'
print(fname)
```
we can save a line by writing:

```python
print(f_name := 'Zac')
```

The Software Carpenter
======================

In this post a "Software Carpenter" means a skilled Software Engineer - someone who understands the craft of software development[ref]Apologies if this is confusing to anyone. I am aware that the emphasis in [Software Carpentry](https://www.software.ac.uk/programmes-events/carpentries/software-carpentry) is on more basic skills but the [Lewis Carroll reference](https://www.poetryfoundation.org/poems/43914/the-walrus-and-the-carpenter-56d222cbc80a9) was too good to pass up.[/ref].

As an analogy I've built some very basic structures in my garage out of left-over pieces of timber.

![Hacky woodwork](images/hacky_woodwork.jpg)

They solve a practical need but a skilled carpenter would build them much better.

![Carpentry](images/carpentry.jpg)

In the software world, there is a similar distinction to be made between hacking together code and being a Software Carpenter.

A Software Carpenter will care about the following:

Readability and Maintainability
-------------------------------

Apart from throwaway code we need to care about readability and maintainability. In addition to unit testing and type hinting the best way of preventing bugs is to make code easily intelligible. This is especially important in projects which run for a long time and involve lots of different coders. And if code is mission critical or enterprise then it is especially important that code is written with readability as a high priority.

Clever Coder not "Clever" Code
------------------------------

Writing the simplest, most readable code possible is not easy. But that is the goal for a Software Carpenter. It can be fun to make the most dense, cryptic code possible - see [Code Golf](https://code.golf/). But we should never do this in production code i.e. code that matters. "Clever" code is a breeding ground for bugs.

Walrus Examples - Simple, Readable Code?
========================================

In a Python mailing list a request was made for example code that demonstrated the value of the Walrus operator. The following was received:

```python
if ( transaction_type := retrieve( transaction ).type ) == "balance":
    show_balance()
elif transaction_type == "deposit":
    add_balance()
elif transaction_type == "withdrawal":
    decrease_balance()
else:
    raise TransactionException( transaction_type...doesn't make sense )
```

Avoiding the Walrus operator would only add one line (as was acknowledged up-front by the contributor) - namely:

```python
transaction_type = retrieve( transaction ).type
```

Using Python without the Walrus operator would also simplify the first condition clause:

```python
if ( transaction_type := retrieve( transaction ).type ) == "balance":
```

would become:

```python
if transaction_type == "balance":
```

Another example was discussed in [Walrus Hunting with StrEnum](https://when-of-python.github.io/blog/walrus-hunting-with-strenum.html). In that case StrEnum seems a better solution. The person suggesting the code agreed but said the example helped the Walrus operator click for them. Fair enough, but the search for a genuinely useful use case continues.

Another developer suggested a good use case for the Walrus operator was:

```python
filtered_list = [res for item in list if (res := slow(item))]
```

which seemed more compelling. The non-Walrus alternative is:

```python
filtered_list = []
for item in list:
    res = slow(item)
    if res:
        filtered_list.append(res)
```

which I have mixed feelings about. It is many more lines of code, albeit very simple code, but it is very readable. The meaning is so plain it is less likely to contain bugs. In balance, perhaps a comprehension could be a useful case where it becomes idiomatic to use the walrus like that. But a few cases might not be enough to recommend learning the Walrus operator. PHP is a language which has blended assignment and evaluation with often mind-boggling results - it is arguably a warning against going down this path. If we want to shrink Common Python then severely restricting the use of the Walrus operator is probably a good idea.

Current Verdict
===============

Until some compelling use cases for the Walrus appear we should probably discourage its widespread use in a When of Python. Mixing assignment and evaluation is a risky exercise and it would be better to invest energy understanding other, more useful, language features or patterns instead.
