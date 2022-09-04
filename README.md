# The When of Python Blog

## Setup

* Install [Poetry](https://python-poetry.org/docs/#installation)
* Check poetry runs; if not, you might need to add \~/.local/bin to your BASH path e.g. put this line in \~/.bashrc  
`export PATH=~/.local/bin:$PATH`
* Clone repo & cd into main directory
* Run `make deps`

## Writing Content

* Run `make devserver`
* View live changes at `http://localhost:8000`
* Add/edit markdown files inside `/content`

## Publishing

* Run `make github`
