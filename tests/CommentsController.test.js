const request = require("supertest");
const app = require("../app");
const { Comment } = require("../models");

describe("CommentsController", () => {
  describe("create", () => {
    it("creates a new comment", async () => {
      const commentData = {
        text: "This is a new comment",
        userId: 1,
        discussionId: 1,
      };
      const response = await request(app).post("/comments").send(commentData);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(commentData);
      const comment = await Comment.findByPk(response.body.id);
      expect(comment).toMatchObject(commentData);
    });
  });

  describe("update", () => {
    it("updates an existing comment", async () => {
      const comment = await Comment.create({
        text: "This is an old comment",
        userId: 1,
        discussionId: 1,
      });
      const updatedCommentData = {
        text: "This is an updated comment",
      };
      const response = await request(app)
        .put(`/comments/${comment.id}`)
        .send(updatedCommentData);
      expect(response.status).toBe(200);
      expect(response.body.text).toBe(updatedCommentData.text);
      const updatedComment = await Comment.findByPk(comment.id);
      expect(updatedComment.text).toBe(updatedCommentData.text);
    });
  });

  describe("delete", () => {
    it("deletes an existing comment", async () => {
      const comment = await Comment.create({
        text: "This is a comment to be deleted",
        userId: 1,
        discussionId: 1,
      });
      const response = await request(app).delete(`/comments/${comment.id}`);
      expect(response.status).toBe(200);
      const deletedComment = await Comment.findByPk(comment.id);
      expect(deletedComment).toBeNull();
    });
  });
});
