import { http } from "@hypermode/modus-sdk-as";
import { JSON } from "json-as";


@json
class EmbeddingResponse {

  @alias("embedding")
  embedding: number[] = [];
}

export function embeddingGenerate(imageUrl: string): EmbeddingResponse {
  console.log(imageUrl);
  const url = `http://127.0.0.1:5000/extract-embedding`;
  const headers = http.Headers.from([["Content-Type", "application/json"]]);

  const payload = `{"image_url": "${imageUrl}"}`;

  const body = http.Content.from(payload);

  const response = http.fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const data = response.json<EmbeddingResponse[]>()[0];
  return data;
}
