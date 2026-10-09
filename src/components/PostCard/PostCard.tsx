
import { useState } from "react";
import "./PostCard.css";

import Comments from "../Comments/Comments";
import { base_url, posts_url } from "../../../core/end_points";
import { patchData, deleteData } from "../../../core/http_methods";

type PostCardProps = {
  postId?: number | string;
  title: string;
  body: string;
  showActions?: boolean;
  canManageComments?: boolean;
  onPostDeleted?: (postId: number | string) => void;
};

const PostCard = ({
  postId,
  title,
  body,
  showActions = false,
  canManageComments = false,
  onPostDeleted,
}: PostCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentBody, setCurrentBody] = useState(body);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = () => {
    setEditTitle(currentTitle);
    setEditBody(currentBody);
    setErrorMessage("");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (postId === undefined) return;

    if (!editTitle.trim() || !editBody.trim()) {
      setErrorMessage("Title and body cannot be empty.");
      return;
    }

    setSaving(true);
    setErrorMessage("");

    try {
      const response = await patchData(
        `${base_url}${posts_url}/${postId}`,
        {
          title: editTitle.trim(),
          body: editBody.trim(),
        }
      );

      if (!response || response.id === undefined) {
        setErrorMessage("Failed to update post. Please try again.");
        return;
      }

      setCurrentTitle(response.title);
      setCurrentBody(response.body);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("Failed to update post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (postId === undefined || deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    setDeleting(true);
    setErrorMessage("");

    try {
      const response = await deleteData(
        `${base_url}${posts_url}/${postId}`
      );

      if (!response) {
        setErrorMessage("Failed to delete post. Please try again.");
        return;
      }

      onPostDeleted?.(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
      setErrorMessage("Failed to delete post. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="post-card">
      {isEditing ? (
        <div className="post-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            placeholder="Post title"
            aria-label="Post title"
          />

          <textarea
            value={editBody}
            onChange={(event) => setEditBody(event.target.value)}
            placeholder="Post content"
            aria-label="Post content"
            rows={5}
          />

          <div className="post-card-actions">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditTitle(currentTitle);
                setEditBody(currentBody);
                setErrorMessage("");
              }}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{currentTitle}</h3>
          <p>{currentBody}</p>

          {showActions && (
            <div className="post-card-actions">
              <button type="button" onClick={handleEdit}>
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </>
      )}

      {errorMessage && (
        <p role="alert" className="comments-error">
          {errorMessage}
        </p>
      )}

      {postId !== undefined && (
        <Comments
          postId={Number(postId)}
          canManage={canManageComments}
        />
      )}
    </div>
  );
};

export default PostCard;