import type { POI } from "../../map/services/poi.service";

import { createPOIDocuments } from "./poiEmbeddingService";
import { createEmbedding } from "./embeddingService";
import { addDocuments } from "./vectorStore";

export async function indexPOIs(pois: POI[]) {
  const documents = createPOIDocuments(pois);

  const vectorDocuments = await Promise.all(
    documents.map(async (doc) => {
      const embedding = await createEmbedding(doc.text);

      return {
        id: doc.id,
        text: doc.text,
        embedding,
        metadata: doc.poi,
      };
    })
  );

  addDocuments(vectorDocuments);
}