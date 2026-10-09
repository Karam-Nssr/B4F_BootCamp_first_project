
import { useEffect, useState } from 'react';
import { useUser } from '../../userContext';
import { base_url, users_url } from '../../../core/end_points';
import {
  getData,
  postData,
  patchData,
  deleteData
} from '../../../core/http_methods';
import './Comments.css';

type Comment = {
  id: number | string;
  postId: number;
  userId?: number | string;
  name: string;
  email: string;
  body: string;
};

type User = {
  id: number | string;
  name: string;
  username?: string;
};

type CommentsProps = {
  postId: number;
  canManage: boolean;
};

const Comments = ({ postId, canManage }: CommentsProps) => {
  const { currentId } = useUser();

  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

 
  const isMyComment = (comment: Comment) => {
    return (
      currentId !== null &&
      currentId !== undefined &&
      comment.userId !== null &&
      comment.userId !== undefined &&
      String(comment.userId) === String(currentId)
    );
  };


  useEffect(() => {
    if (!showComments) return;

    const fetchComments = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const response = await getData(
          `${base_url}comments?postId=${postId}`
        );

        if (Array.isArray(response)) {
          setComments(response);
        } else {
          setComments([]);
          setErrorMessage('Could not load comments.');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setErrorMessage('Could not load comments.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, showComments]);

  const addComment = async () => {
    if (!newComment.trim() || submitting) return;

    if (currentId === null || currentId === undefined) {
      setErrorMessage('Please select a user first.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const usersResponse = await getData(
        `${base_url}${users_url}`
      );

      if (!Array.isArray(usersResponse)) {
        setErrorMessage('Could not load users.');
        return;
      }

      const currentUser = usersResponse.find(
        (user: User) => String(user.id) === String(currentId)
      );

      if (!currentUser) {
        setErrorMessage('User not found.');
        return;
      }

      const commentData = {
        postId: Number(postId),
        userId: currentUser.id,
        name: currentUser.name || currentUser.username || 'User',
        email: '',
        body: newComment.trim()
      };

      const response = await postData(
        `${base_url}comments`,
        commentData
      );

      if (!response || response.id === undefined) {
        setErrorMessage('Failed to add comment. Please try again.');
        return;
      }

      setComments((previous) => [...previous, response]);
      setNewComment('');
      setShowComments(true);
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('Failed to add comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };


  const startEditing = (comment: Comment) => {
    if (!isMyComment(comment)) return;

    setEditingId(comment.id);
    setEditText(comment.body);
    setErrorMessage('');
  };


  const saveEdit = async (commentId: number | string) => {
    if (!editText.trim()) return;

    const comment = comments.find(
      (item) => String(item.id) === String(commentId)
    );

    if (!comment || !isMyComment(comment)) {
      setErrorMessage('You can only edit your own comments.');
      return;
    }

    try {
      setErrorMessage('');

      const updatedBody = editText.trim();

      const response = await patchData(
        `${base_url}comments/${commentId}`,
        { body: updatedBody }
      );

      if (!response) {
        setErrorMessage('Failed to update comment.');
        return;
      }

      setComments((previous) =>
        previous.map((item) =>
          String(item.id) === String(commentId)
            ? { ...item, body: updatedBody }
            : item
        )
      );

      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Error editing comment:', error);
      setErrorMessage('Failed to update comment.');
    }
  };

  const removeComment = async (commentId: number | string) => {
    const comment = comments.find(
      (item) => String(item.id) === String(commentId)
    );

    if (!comment) {
      setErrorMessage('Comment not found.');
      return;
    }


    if (!canManage && !isMyComment(comment)) {
      setErrorMessage('You can only delete your own comments.');
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this comment?'
    );

    if (!confirmed) return;

    try {
      setErrorMessage('');

      const response = await deleteData(
        `${base_url}comments/${commentId}`
      );

      if (!response) {
        setErrorMessage('Failed to delete comment.');
        return;
      }

      setComments((previous) =>
        previous.filter(
          (item) => String(item.id) !== String(commentId)
        )
      );

      if (String(editingId) === String(commentId)) {
        setEditingId(null);
        setEditText('');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setErrorMessage('Failed to delete comment.');
    }
  };

  return (
    <div className="comments-section">
      <button
        type="button"
        className="comments-toggle"
        onClick={() => setShowComments((previous) => !previous)}
      >
        <span>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </span>
        <span className="comments-arrow">
          {showComments ? '−' : '+'}
        </span>
      </button>

      {showComments && (
        <div className="comments-content">
          <div className="add-comment">
            <h4 className="add-comment-title">Write a comment</h4>

            <textarea
              className="comment-input"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
            />

            <div className="add-comment-footer">
              <span className="comment-hint">
                Be respectful and kind.
              </span>

              <button
                type="button"
                className="add-comment-button"
                onClick={addComment}
                disabled={!newComment.trim() || submitting}
              >
                {submitting ? 'Adding...' : 'Add Comment'}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="comments-error">{errorMessage}</p>
          )}

          <div className="comments-heading">
            <h4>Comments</h4>
            {!loading && (
              <span className="comments-count">
                {comments.length}
              </span>
            )}
          </div>

          {loading ? (
            <p className="comments-message">
              Loading comments...
            </p>
          ) : comments.length === 0 ? (
            <p className="comments-message">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => {
                const isOwner = isMyComment(comment);
                const canEditThisComment = isOwner;
                const canDeleteThisComment = canManage || isOwner;

                return (
                  <div className="comment-item" key={comment.id}>
                    <div className="comment-avatar">
                      {comment.name?.charAt(0).toUpperCase() || '?'}
                    </div>

                    <div className="comment-main">
                      <div className="comment-header">
                        <h5 className="comment-author">
                          {comment.name}
                        </h5>
                      </div>

                      {editingId === comment.id ? (
                        <div className="edit-comment">
                          <textarea
                            className="comment-input"
                            value={editText}
                            onChange={(event) =>
                              setEditText(event.target.value)
                            }
                            rows={3}
                          />

                          <div className="comment-actions">
                            <button
                              type="button"
                              className="comment-save-button"
                              onClick={() => saveEdit(comment.id)}
                              disabled={!editText.trim()}
                            >
                              Save
                            </button>

                            <button
                              type="button"
                              className="comment-cancel-button"
                              onClick={() => {
                                setEditingId(null);
                                setEditText('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="comment-body">
                            {comment.body}
                          </p>

                          {(canEditThisComment || canDeleteThisComment) && (
                            <div className="comment-actions">
                              {canEditThisComment && (
                                <button
                                  type="button"
                                  className="comment-edit-button"
                                  onClick={() => startEditing(comment)}
                                >
                                  Edit
                                </button>
                              )}

                              {canDeleteThisComment && (
                                <button
                                  type="button"
                                  className="comment-delete-button"
                                  onClick={() => removeComment(comment.id)}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;