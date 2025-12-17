import type { Probot } from "probot";
import { hasLgtmComment } from "./lgtm-comment.js";
import { fetchLgtmImage } from "./lgtmeow.js";

export default (app: Probot) => {
  app.log.info("LGTM Cat GitHub App is running!");

  app.on("pull_request_review.submitted", async (context) => {
    const { review, pull_request, repository } = context.payload;

    if (review.state !== "approved") {
      return;
    }

    try {
      const { data: comments } = await context.octokit.rest.issues.listComments(
        {
          owner: repository.owner.login,
          repo: repository.name,
          issue_number: pull_request.number,
        }
      );

      if (hasLgtmComment(comments)) {
        app.log.info("LGTM image already posted, skipping");
        return;
      }

      const lgtmMarkdown = await fetchLgtmImage();

      await context.octokit.rest.issues.createComment({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: pull_request.number,
        body: lgtmMarkdown,
      });
    } catch (error) {
      app.log.error(error, "Failed to post LGTM cat image");
    }
  });
};
