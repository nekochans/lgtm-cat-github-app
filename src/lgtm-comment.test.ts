import { describe, expect, it } from "vitest";
import { hasLgtmComment } from "./lgtm-comment.js";

describe("hasLgtmComment", () => {
  it("should return true when LGTM comment exists", () => {
    const comments = [
      {
        body: "[![LGTMeow](https://example.com/cat.webp)](https://lgtmeow.com)",
      },
    ];
    expect(hasLgtmComment(comments)).toBe(true);
  });

  it("should return false when no LGTM comment", () => {
    const comments = [{ body: "LGTM!" }, { body: "Looks good to me" }];
    expect(hasLgtmComment(comments)).toBe(false);
  });

  it("should return false when comments is empty", () => {
    expect(hasLgtmComment([])).toBe(false);
  });

  it("should handle comments with null body", () => {
    const comments = [{ body: null }, { body: undefined }];
    expect(hasLgtmComment(comments)).toBe(false);
  });
});
