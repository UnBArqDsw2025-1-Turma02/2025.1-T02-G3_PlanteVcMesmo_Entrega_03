export namespace LLMProvider {
  export namespace Chat {
    export type Input = {
      question: string;
    };

    export type Output = {
      answer: string;
    };
  }
}

export interface LLMProvider {
  chat(input: LLMProvider.Chat.Input): Promise<LLMProvider.Chat.Output>;
}
