export const LLMTypes = {
  CHATGPT: 'CHATGPT',
  GEMINI: 'GEMINI',
} as const;

export type LLMType = keyof typeof LLMTypes;

export const StrategyTypes = {
  MANUAL: 'MANUAL',
  AUTOMATIC: 'AUTOMATIC',
} as const;

export type StrategyType = keyof typeof StrategyTypes;
