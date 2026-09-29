import common from "./locales/vi/common.json";
import game from "./locales/vi/game.json";
import tutorial from "./locales/vi/tutorial.json";
import adventure from "./locales/vi/adventure.json";

const messages = { common, game, tutorial, adventure } as const;
export type TranslationKey =
  | `common.${keyof typeof common}`
  | `game.${keyof typeof game}`
  | `tutorial.${keyof typeof tutorial}`
  | `adventure.${keyof typeof adventure}`;

export function t(
  key: TranslationKey,
  values: Record<string, string | number> = {},
): string {
  const [namespace, name] = key.split(".") as [keyof typeof messages, string];
  const namespaceMessages = messages[namespace] as Record<string, string>;
  const template = namespaceMessages[name] ?? key;
  return Object.entries(values).reduce(
    (message, [placeholder, value]) =>
      message.replaceAll(`{{${placeholder}}}`, String(value)),
    template,
  );
}
