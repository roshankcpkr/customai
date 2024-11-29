import { graphql } from "@hypermode/modus-sdk-as";
import { Image } from "../classes/classes";
import { embeddingGenerate } from "../helpers/embeddings";
import { JSON } from "json-as";

const connection: string = "dgraph";


@json
class QueryImageByEmbeddingResponse {

  @alias("querySimilarImageByEmbedding")
  label: string = "";
}


@json
class ValidateProjectTokenResponse {
  validateProjectToken: boolean = false;
}

export function runInference(
  imageUrl: string,
  projectId: string,
): QueryImageByEmbeddingResponse {
  const embedding = embeddingGenerate(imageUrl);
  const data = embedding.embedding;

  const log = JSON.stringify(data);
  console.log(log);
  //   const validateQuery = `
  //   query validateProjectToken($projectId: ID!, $token: String!) {
  //   validateProjectToken(projectId: $projectId, token: $token)
  // }
  //   `;

  //   const validateVars = new graphql.Variables();
  //   validateVars.set("projectId", projectId);
  //   validateVars.set("token", token);

  //   const validateResponse = graphql.execute<ValidateProjectTokenResponse>(
  //     connection,
  //     validateQuery,
  //     validateVars,
  //   );

  //   const isValid = validateResponse.data!.validateProjectToken;
  //   if (!isValid) {
  //     throw new Error("Invalid token");
  //   }

  const statement = `
  query querySimilarImagesByEmbedding($embedding: [Float!]!, projectId: ID!) {
      querySimilarImagesByEmbedding(embedding: $embedding, projectId: $projectId) {
        label
      }
  }
`;

  const vars = new graphql.Variables();
  vars.set("embedding", data);
  vars.set("projectId", projectId);

  const response = graphql.execute<QueryImageByEmbeddingResponse>(
    connection,
    statement,
    vars,
  );

  const resdata = response.data!.label;
  const result = new QueryImageByEmbeddingResponse();
  result.label = resdata;
  return result;
}
