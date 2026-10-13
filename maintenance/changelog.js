(() => {
  const picker = document.getElementById('release-version');
  const releases = [...document.querySelectorAll('.release[data-version]')];
  if (!picker || !releases.length) return;
  const latest = releases[0];
  function showRelease() {
    const requested = new URLSearchParams(location.search).get('version');
    const anchor = document.getElementById(location.hash.slice(1));
    const release = releases.find(item => item.dataset.version === requested)
      || anchor?.closest('.release') || latest;
    releases.forEach(item => { item.hidden = item !== release; });
    picker.value = release.dataset.version;
    document.title = `Realm Idle · ${picker.value} Update Notes`;
  }
  picker.addEventListener('change', () => {
    const url = new URL(location.href);
    url.searchParams.set('version', picker.value);
    url.hash = '';
    history.pushState(null, '', url);
    showRelease();
  });
  window.addEventListener('popstate', showRelease);
  window.addEventListener('hashchange', showRelease);
  showRelease();
  picker.closest('.release-picker').hidden = false;
})();
