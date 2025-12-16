import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchLgtmImage } from "./lgtmeow.js";

describe("fetchLgtmImage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubEnv("LGTMEOW_BASE_URL", "https://api.lgtmeow.com");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("should return markdown when API call succeeds", async () => {
    const mockMarkdown =
      "[![LGTMeow](https://example.com/cat.webp)](https://lgtmeow.com)";
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ markdown: mockMarkdown }),
    } as Response);

    const result = await fetchLgtmImage();
    expect(result).toBe(mockMarkdown);
  });

  it("should throw error when API call fails", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchLgtmImage()).rejects.toThrow(
      "Failed to fetch LGTM image: 500 Internal Server Error"
    );
  });

  it("should throw error when LGTMEOW_BASE_URL is not set", async () => {
    vi.unstubAllEnvs();
    vi.stubEnv("LGTMEOW_BASE_URL", "");

    await expect(fetchLgtmImage()).rejects.toThrow(
      "LGTMEOW_BASE_URL environment variable is not set"
    );
  });
});
