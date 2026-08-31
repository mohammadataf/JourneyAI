import { addDocuments } from "./vectorStore";
import { searchSimilarPOIs } from "./vectorSearchService";


addDocuments([
  {
    id: "1",
    text: "Peaceful scenic nature park",
    embedding: [0.9, 0.8, 0.7],
    metadata: {
      name: "Nature Park"
    }
  },
  {
    id: "2",
    text: "Busy market area",
    embedding: [0.1, 0.2, 0.3],
    metadata: {
      name: "City Market"
    }
  },
  {
    id: "3",
    text: "Beautiful lake view photography spot",
    embedding: [0.85, 0.75, 0.65],
    metadata: {
      name: "Lake View"
    }
  }
]);


const queryEmbedding = [
  0.88,
  0.78,
  0.68
];


const results = searchSimilarPOIs(
  queryEmbedding,
  2
);


console.log(results);