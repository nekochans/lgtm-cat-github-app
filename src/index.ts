import type { Probot } from "probot";

export default (app: Probot) => {
  app.log.info("LGTM Cat GitHub App is running!");

  app.on("pull_request_review.submitted", (context) => {
    const { review, pull_request, repository } = context.payload;

    app.log.info({
      action: "pull_request_review.submitted",
      repo: repository.full_name,
      pr: pull_request.number,
      reviewer: review.user?.login ?? "unknown",
      state: review.state,
    });

    if (review.state === "approved") {
      app.log.info("PR was approved! Ready to post LGTM cat image.");
      // TODO: LGTM cat image posting will be implemented in the next issue
    }
  });
};
