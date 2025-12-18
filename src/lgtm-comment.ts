const LGTM_MARKER = "lgtmeow.com";

type Comment = { body?: string | null };

export function hasLgtmComment(comments: Comment[]): boolean {
  return comments.some((comment) => comment.body?.includes(LGTM_MARKER));
}
