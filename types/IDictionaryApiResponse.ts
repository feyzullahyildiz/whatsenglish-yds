/* eslint-disable @typescript-eslint/no-explicit-any */
export type IDictionaryApiResponse = Array<{
  word: string;
  phonetic: string;
  phonetics: Array<{
    text: string;
    audio: string;
    sourceUrl: string;
    license: {
      name: string;
      url: string;
    };
  }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      synonyms: Array<any>;
      antonyms: Array<any>;
      example?: string;
    }>;
    synonyms: Array<string>;
    antonyms: Array<any>;
  }>;
  license: {
    name: string;
    url: string;
  };
  sourceUrls: Array<string>;
}>;
