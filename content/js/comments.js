/* Some adapted code originally from https://github.com/utterance/utterances
   Copyright (c) 2018 Jeremy Danyow - MIT License */
(function () {

  const owner = 'lean-python-org';
  const repo = 'blog';

  const url = new URL(location.href);
  const pathname = url.pathname.length < 2 ? 'index' : url.pathname.substr(1).replace(/\.\w+$/, '');
  const canonicalLink = document.querySelector(`link[rel='canonical']`);
  const documentUrl = canonicalLink ? canonicalLink.href : url.origin + url.pathname + url.search;
  const title = document.title;
  const descriptionMeta = document.querySelector(`meta[name='description']`);
  const description = descriptionMeta ? descriptionMeta.content : '';

  const GITHUB_API = 'https://api.github.com/';
  const GITHUB_ENCODING__REST_V3 = 'application/vnd.github.v3+json';

  function githubRequest(relativeUrl, init) {
    init = init || {};
    init.mode = 'cors';
    init.cache = 'no-cache'; // force conditional request
    const request = new Request(GITHUB_API + relativeUrl, init);
    request.headers.set('Accept', GITHUB_ENCODING__REST_V3);
    return request;
  }

  const rateLimit = {
    standard: {
      limit: Number.MAX_VALUE,
      remaining: Number.MAX_VALUE,
      reset: 0
    },
    search: {
      limit: Number.MAX_VALUE,
      remaining: Number.MAX_VALUE,
      reset: 0
    }
  };

  function processRateLimit(response) {
    const limit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    const isSearch = /\/search\//.test(response.url);
    const rate = isSearch ? rateLimit.search : rateLimit.standard;

    rate.limit = +limit;
    rate.remaining = +remaining;
    rate.reset = +reset;

    if (response.status === 403 && rate.remaining === 0) {
      const resetDate = new Date(0);
      resetDate.setUTCSeconds(rate.reset);
      const mins = Math.round((resetDate.getTime() - new Date().getTime()) / 1000 / 60);
      const apiType = isSearch ? 'search API' : 'non-search APIs';
      console.warn(`Rate limit exceeded for ${apiType}. Resets in ${mins} minute${mins === 1 ? '' : 's'}.`);
    }
  }

  function githubFetch(request) {
    return fetch(request).then(response => {
      processRateLimit(response);
      return response;
    });
  }

  function loadIssueByTerm(term) {
    const q = `"${term}" type:issue in:title repo:${owner}/${repo}`;
    const request = githubRequest(`search/issues?q=${encodeURIComponent(q)}&sort=created&order=asc`);
    return githubFetch(request).then(response => {
      if (!response.ok) {
        throw new Error('Error fetching issue via search.');
      }
      return response.json();
    }).then(results => {
      if (results.total_count === 0) {
        return null;
      }
      if (results.total_count > 1) {
        console.warn(`Multiple issues match "${q}".`);
      }
      term = term.toLowerCase();
      for (const result of results.items) {
        if (result.title.toLowerCase().indexOf(term) !== -1) {
          return result;
        }
      }
      // While this isn't ideal, we keep this for consistency with the
      // issue utterances displays comments for.
      console.warn(`Issue search results do not contain an issue with title matching "${term}". Using first result.`);
      return results.items[0];
    });
  }

  function populateManualCommenting() {
    const manualCommentingElement = document.getElementById('manual-commenting');
    const openingQuestion = "Don't want to authorize <a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://utteranc.es/\">utterances</a> to post comments with your GitHub account?";
    const issueTerm = pathname;

    loadIssueByTerm(issueTerm).then(issue => {
      if (issue !== null) {
        // Existing issue found.
        const issueUrl = issue.html_url;
        manualCommentingElement.innerHTML= `${openingQuestion}<br><a target="_blank" rel="noopener noreferrer"href="${issueUrl}">Leave a comment on this GitHub issue</a>, and it will be visible to everyone below.`;
      }
      else {
        // No existing issue, need to make a new one.
        const newIssueTitle = encodeURIComponent(issueTerm);
        const newIssueBody = encodeURIComponent(`# ${title}\n\n${description}\n\n[${documentUrl}](${documentUrl})`);
        const newIssueUrl = `https://github.com/${owner}/${repo}/issues/new?title=${newIssueTitle}&body=${newIssueBody}`;
        manualCommentingElement.innerHTML= `${openingQuestion}<br><a target="_blank" rel="noopener noreferrer" href="${newIssueUrl}">Make a new GitHub issue and then leave a comment on it.</a> Your comment will be visible to everyone below.`;
      }
    });
  }

  window.addEventListener('load', populateManualCommenting);

})();
