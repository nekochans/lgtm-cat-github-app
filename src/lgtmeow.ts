const LGTM_IMAGE_PATH = "/mcp/lgtm-images/markdown";

type LgtmImageResponse = {
  markdown: string;
};

export async function fetchLgtmImage(): Promise<string> {
  const baseUrl = process.env.LGTMEOW_BASE_URL;
  if (!baseUrl) {
    throw new Error("LGTMEOW_BASE_URL environment variable is not set");
  }

  const apiUrl = `${baseUrl}${LGTM_IMAGE_PATH}`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch LGTM image: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as LgtmImageResponse;
  return data.markdown;
}
