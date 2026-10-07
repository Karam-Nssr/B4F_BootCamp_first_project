import './PostCard.css';

type PostCardProps = {
  title: string;
  body: string;
  showActions?: boolean;
};

const PostCard = ({
  title,
  body,
  showActions = false
}: PostCardProps) => {
  return (
    <div className="post-card">
      <h3>{title}</h3>

      <p>{body}</p>

      {showActions && (
        <div className="post-card-actions">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;