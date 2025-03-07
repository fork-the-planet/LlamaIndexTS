import { OpenAI } from "@llamaindex/openai";
import { Document, KeywordExtractor, SentenceSplitter } from "llamaindex";

(async () => {
  const openaiLLM = new OpenAI({ model: "gpt-3.5-turbo", temperature: 0 });

  const nodeParser = new SentenceSplitter();

  const nodes = nodeParser.getNodesFromDocuments([
    new Document({ text: "banana apple orange pear peach watermelon" }),
  ]);

  console.log(nodes);

  const keywordExtractor = new KeywordExtractor({
    llm: openaiLLM,
    keywords: 5,
  });

  const nodesWithKeywordMetadata = await keywordExtractor.processNodes(nodes);

  process.stdout.write(JSON.stringify(nodesWithKeywordMetadata, null, 2));
})();
