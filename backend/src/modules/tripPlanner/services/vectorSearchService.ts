import { getDocuments } from "./vectorStore";
import type { Theme } from "../../map/services/poi.service";

function cosineSimilarity(
  a: number[],
  b: number[]
) {
  let dot = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  const length = Math.min(a.length, b.length);

  for (let i = 0; i < length; i++) {
    dot += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return (
    dot /
    (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB))
  );
}

export function searchSimilarPOIs(
  queryEmbedding: number[],
  limit = 20,
  categories?: Theme[]
) {
  const documents = getDocuments();

  const filteredDocuments = categories?.length
    ? documents.filter((doc) =>
        categories.includes(doc.metadata.category as Theme)
      )
    : documents;

  const results = filteredDocuments
    .map((doc) => ({
      ...doc,
      score: cosineSimilarity(
        queryEmbedding,
        doc.embedding
      ),
    }))
    .sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}