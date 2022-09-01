Title: One Obvious Way - An Ongoing Challenge
Date: 2022-09-01 22:01
Category: Python
Tags: python, learners, teaching
Slug: one-obvious-way
Authors: Grant Paton-Simpson
Summary: Python prides itself on having one obvious way to do things
         but it is more of an ideal than a reality sometimes.
         But we should still aim in that direction.

From the Zen of Python to the When of Python
--------------------------------------------

> There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.

Python prides itself on having one obvious way to do things
but it is more of an ideal than a reality sometimes.
Nonetheless we should aim in that direction to increase code readability
and reduce the barriers to learning and mastering Python.

The When of Python will hopefully make it easier to identify the preferred approaches to general tasks,
and the preferred alternatives for specific situations.


True 11 years ago, true today
-----------------------------

It was spooky reading a post of Nick Coghlan's from eleven years ago.
It harmonises very well with a key concern of the When of Python - namely, making Python easier for learners.
And not just people starting off as full-time developers.
Python also needs to work for people who are astronomers, biologists etc first, and developers second.
Anyway, here is what Nick had to say:


> *What do you mean by "cognitive burden"?*

> Even without considering the near-term cost of changes, every addition to the language (and even the standard library) imposes a potential burden on anyone learning the language in the future. You can't just say, "Oh, I won't worry about learning that feature" if the code base you've been asked to maintain uses it, or if it is offered as an answer to a query posted on python-list or Stack Overflow or the like. The principle of "There Should Be One - and preferably only one - Obvious Way To Do It" is aimed squarely at reducing the cognitive load on people trying to learn the language. Quite clearly, the "only one" aspect is an ideal rather than a practical reality (two kinds of string formatting and three argument parsing libraries in the standard library all say "Hi!"), but in such cases we do try to indicate that the most recently added (and hopefully least quirky) approach is the preferred way to do it.
>
>([Musings on the culture of python-dev  Nick Coghlan 2011-04-21](https://www.curiousefficiency.org/posts/2011/04/musings-on-culture-of-python-dev.html))

Looking back from 2022, we've managed to simplify argument parsing. As far as string formatting goes, though, we now have four approaches! Oh well - two steps forward, one step back.
Perhaps developing a When of Python will help.
As we said in our Kiwi PyCon presentation, newer is not always better (or worse for that matter)
so more explicit guidance is probably helpful.
