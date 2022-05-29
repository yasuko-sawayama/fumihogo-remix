import { useParams } from "@remix-run/react";

function SingleStory() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-xl">SingleStory</h2>
      {`id: ${id}`}
    </div>
  );
}

export default SingleStory;
