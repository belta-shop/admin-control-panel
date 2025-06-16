export function isActive(href: string, pathname: string, isParent = false) {
  const hrefUrl = new URL(href, 'http://dummy.com');
  const pathnameUrl = new URL(pathname, 'http://dummy.com');

  if (isParent) {
    return pathnameUrl.pathname.startsWith(hrefUrl.pathname);
  }

  if (hrefUrl.pathname !== pathnameUrl.pathname) {
    return false;
  }

  const hrefParams = hrefUrl.searchParams;
  const pathnameParams = pathnameUrl.searchParams;

  for (const [key, value] of hrefParams) {
    if (pathnameParams.get(key) !== value) {
      return false;
    }
  }

  return true;
}
