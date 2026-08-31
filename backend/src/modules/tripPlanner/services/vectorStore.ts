interface VectorDocument {
  id: string;
  text: string;
  embedding: number[];
  metadata: any;
}

const documents: VectorDocument[] = [];

export function addDocuments(
  docs: VectorDocument[]
) {
  documents.push(...docs);
}


export function getDocuments() {
  return documents;
}