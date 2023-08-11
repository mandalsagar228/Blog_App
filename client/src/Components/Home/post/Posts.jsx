import { useEffect, useState } from "react";
import { API } from "../../service/api";
import SinglePost from "./singlepost";
import { Grid } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

const Posts = () => {
  const [post, setPost] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostData({ category: category || "" });
      if (response.isSuccess) {
        setPost(response.data);
        console.log("Data has been fetched successfully", response);
      } else {
        console.log("something error while getting data");
      }
    };

    fetchData();
  }, [category]);
  return (
    <>
      {post?.length ? (
        post.map((posts) => (
          <Grid item lg={3} sm={4} xs={12}>
            <Link
              to={`details/${posts._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <SinglePost posts={posts} />
            </Link>
          </Grid>
        ))
      ) : (
        <div>no data has found</div>
      )}
    </>
  );
};
export default Posts;
