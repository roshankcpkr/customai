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
class ImageData {
  id: string;
  imageUrl: string;
  label: string;
}


@json
class GetImagesResponse {
  queryImage: ImageData[];
}

export function createImage(
  imageUrl: string,
  label: string,
  projectId: string,
  token: string,
  owner: string,
): Image | null {
  const embedding = embeddingGenerate(imageUrl);
  const data = embedding.embedding;
  const log = JSON.stringify(data);
  console.log(log);
  const statement = `
    mutation createImage($imageUrl: String!, $label: String, $embedding: [Float!], $projectId: String, $tokenId: String, $owner: String) {
        addImage(input: {imageUrl: $imageUrl, label: $label, embedding: $embedding, projectId: $projectId, token: $tokenId, owner: $owner}) {
        numUids
    
        }}
    
    `;

  const vars = new graphql.Variables();
  vars.set("imageUrl", imageUrl);
  vars.set("label", label);
  vars.set("embedding", data);
  vars.set("projectId", projectId);
  vars.set("tokenId", token);
  vars.set("owner", owner);

  const response = graphql.execute<CreateImageResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.createImage;
}

export function getImages(projectId: string): ImageData[] {
  const statement = `
        query queryImage($projectId: String) {
            queryImage (filter: {projectId: {eq: $projectId}}) {
                id
                imageUrl
                label
            }
        }
        `;
  const vars = new graphql.Variables();
  vars.set("projectId", projectId);

  const response = graphql.execute<GetImagesResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.queryImage;
}


@json
class DeleteImageResponse {
  deleteImage: Image | null;
}

export function deleteImage(
  imageId: string,
  projectId: string,
  ownerId: string,
): boolean {
  const statement = `
    mutation deleteImage($id: [ID!], $owner: String, $projectId: String) {
        deleteImage(filter: {id: $id, owner: {eq: $owner}, projectId: {eq: $projectId}}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", projectId);
  vars.set("owner", ownerId);
  vars.set("projectId", projectId);

  const response = graphql.execute<DeleteImageResponse>(
    connection,
    statement,
    vars,
  );
  const value = response.data!.deleteImage;
  return value ? true : false;
}


@json
class LabelData {
  id: string;
  label: string;
  imageUrl: string;
}


@json
class GetLabelsResponse {
  queryImage: LabelData[];
}
export function getLabels(projectId: string, ownerId: string): LabelData[] {
  const statement = `
        query queryImage($projectId: String, $owner: String) {
            queryImage (filter: {projectId: {eq: $projectId}, owner: {eq: $owner}}) {
                id
                imageUrl
                label
            }
        }
        `;
  const vars = new graphql.Variables();
  vars.set("projectId", projectId);
  vars.set("owner", ownerId);

  const response = graphql.execute<GetLabelsResponse>(
    connection,
    statement,
    vars,
  );

  return response.data!.queryImage;
}

export function deleteLabel(
  imageId: string,
  projectId: string,
  ownerId: string,
): boolean {
  const statement = `
    mutation deleteImage($id: [ID!], $owner: String, $projectId: String) {
        deleteImage(filter: {id: $id, owner: {eq: $owner}, projectId: {eq: $projectId}}) {
            numUids
        }
    }
`;

  const vars = new graphql.Variables();
  vars.set("id", imageId);
  vars.set("owner", ownerId);
  vars.set("projectId", projectId);

  const response = graphql.execute<DeleteImageResponse>(
    connection,
    statement,
    vars,
  );
  const value = response.data!.deleteImage;
  return value ? true : false;
}
