import { graphql } from "@hypermode/modus-sdk-as";
import { Image } from "../classes/classes";
import { embeddingGenerate } from "../helpers/embeddings";
import { JSON } from "json-as";

const connection: string = "dgraph";


@json
class CreateImageResponse {
  createImage: Image | null = null;
}


@json
class ImageResponse {
  queryImage: Image[] = [];
}
export function createImage(
  imageUrl: string,
  label: string,
  projectId: string,
): Image | null {
  const embedding = embeddingGenerate(imageUrl);
  const data = embedding.embedding;
  const log = JSON.stringify(data);
  console.log(log);
  const statement = `
    mutation createImage($imageUrl: String!, $label: String!, $embedding: [Float!], $projectId: ID!) {
        addImage(input: {imageUrl: $imageUrl, label: $label, embedding: $embedding, project: { id: $projectId}}, projectId: $projectId) {
        numUids
    
        }}
    
    `;

  const vars = new graphql.Variables();
  vars.set("imageUrl", imageUrl);
  vars.set("label", label);
  vars.set("embedding", data);
  vars.set("projectId", projectId);

  const response = graphql.execute<CreateImageResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.createImage;
}

export function getImages(): ImageResponse[] {
  const statement = `
        query queryImage{
            queryImage {
                id
                imageUrl
                label
                project {
                id
                }
            }
        }
        `;

  const response = graphql.execute<ImageResponse[]>(connection, statement);

  return response.data!;
}
