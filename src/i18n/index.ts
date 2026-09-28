import common from "./locales/vi/common.json";
import game from "./locales/vi/game.json";

const messages = { common, game } as const;
export type TranslationKey =
  | `common.${keyof typeof common}`
  | `game.${keyof typeof game}`;

export function t(key: TranslationKey): string {
  const [namespace, name] = key.split(".") as [keyof typeof messages, string];
  const namespaceMessages = messages[namespace] as Record<string, string>;
  return namespaceMessages[name] ?? key;
}
