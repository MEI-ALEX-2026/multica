import type { LocaleAdapter, SupportedLocale } from "@multica/core/i18n";

const STORAGE_KEY = "multica-locale";

// Desktop adapter:
//   - User choice: localStorage (set by Settings switcher).
//   - Default locale: Simplified Chinese, unless the user explicitly chooses
//     another language in Settings.
//   - Persist: localStorage. The Settings switcher additionally PATCHes
//     /api/me when logged in so user.language follows the user across devices.
export function createDesktopLocaleAdapter(systemLocale: string): LocaleAdapter {
  void systemLocale;
  return {
    getUserChoice() {
      try {
        return window.localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    },
    getSystemPreferences() {
      return [];
    },
    persist(locale: SupportedLocale) {
      try {
        window.localStorage.setItem(STORAGE_KEY, locale);
      } catch {
        // Best-effort
      }
    },
  };
}
