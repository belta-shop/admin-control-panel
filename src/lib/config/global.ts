export const enum COOKIES_KEYS {
  Locale = 'NEXT_LOCALE',
  User = 'user',
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
}

export const enum LOCAL_STORAGE_KEYS {
  NavbarType = 'navbarType',
}

export const DEFAULT_LIMIT = 10;
export const tableRowsPerPageOptions = [5, 10, 30];

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
