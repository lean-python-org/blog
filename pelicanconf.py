AUTHOR = 'Grant Paton-Simpson & Ben Denham'
SITENAME = 'The When of Python Blog'
SITESUBTITLE = 'Guidance on when to use Python features (and when not to)'
SITEDESCRIPTION = '''
<div class="text-muted" style="padding-bottom: 10px;">Guidance on when to use Python features (and when not to).</div>
<div class="text-muted" style="padding-bottom: 10px;">Comment your opinions on our articles to join the discussion.</div>
<div class="text-muted" style="padding-bottom: 10px;">Follow us on <a href="https://twitter.com/WhenOfPython">Twitter</a> and <a href="https://github.com/when-of-python">GitHub</a> to get the latest updates first.</div>
'''
SITEIMAGE = 'images/logo.png'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Pacific/Auckland'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Social widget
ICONS = (('fa-brands fa-twitter', 'https://twitter.com/WhenOfPython'),
         ('fa-brands fa-github', 'https://github.com/when-of-python'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = 'themes/pelican-alchemy/alchemy'

# https://github.com/getpelican/pelican/wiki/Tips-n-Tricks#second-solution-using-static_paths
STATIC_PATHS = ['extras', 'images', 'css', 'js']
ARTICLE_EXCLUDES = ['extras']
EXTRA_PATH_METADATA = {
    'extras/android-chrome-192x192.png': {'path': 'android-chrome-192x192.png'},
    'extras/android-chrome-512x512.png': {'path': 'android-chrome-512x512.png'},
    'extras/apple-touch-icon.png': {'path': 'apple-touch-icon.png'},
    'extras/browserconfig.xml': {'path': 'browserconfig.xml'},
    'extras/favicon.ico': {'path': 'favicon.ico'},
    'extras/favicon-16x16.png': {'path': 'favicon-16x16.png'},
    'extras/favicon-32x32.png': {'path': 'favicon-32x32.png'},
    'extras/mstile-150x150.png': {'path': 'mstile-150x150.png'},
    'extras/safari-pinned-tab.svg': {'path': 'safari-pinned-tab.svg'},
    'extras/site.webmanifest': {'path': 'site.webmanifest'},
    'extras/google61a446b9d9e5e822.html': {'path': 'google61a446b9d9e5e822.html'},
}
RFG_FAVICONS = True
BOOTSTRAP_CSS = 'css/darkly.bootstrap.css'
THEME_CSS_OVERRIDES = ['css/custom.css']
PYGMENTS_STYLE = 'native'

THEME_TEMPLATES_OVERRIDES = ['template-overrides/']
