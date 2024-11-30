import { graphql } from "@hypermode/modus-sdk-as";
import { Image } from "../classes/classes";
import { embeddingGenerate } from "../helpers/embeddings";
import { JSON } from "json-as";

const connection: string = "dgraph";


@json
class LabelData {
  label: string;
}


@json
class QueryImageByEmbeddingResponse {
  querySimilarImageByEmbedding: LabelData[];
}

export function runInference(
  imageUrl: string,
  projectId: string,
  token: string,
): LabelData[] {
  const embedding = embeddingGenerate(imageUrl);
  const data = embedding.embedding;

  const log = JSON.stringify(data);
  console.log(log);
  const statement = `
  query querySimilarImageByEmbedding($embeddings: [Float!]!, $projectId: String, $token: String) {
      querySimilarImageByEmbedding(by: embedding, topK:1, vector: $embeddings, filter: {projectId: {eq: $projectId}, token: {eq: $token}}) {
        label
      }
  }
`;

  const vars = new graphql.Variables();
  vars.set("embeddings", data);
  vars.set("token", token);
  vars.set("projectId", projectId);

  const response = graphql.execute<QueryImageByEmbeddingResponse>(
    connection,
    statement,
    vars,
  );

  const resdata = response.data!.querySimilarImageByEmbedding;
  const logdata = JSON.stringify(resdata);
  console.log(logdata);

  return resdata;
}
