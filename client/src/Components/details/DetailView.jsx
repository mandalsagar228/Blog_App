import { Box, Typography, styled } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../Context/dataProvider";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../service/api";
import { Comment } from "./comments/Comment";

const Image = styled("img")`
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;
const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
`;
const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
`;
const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;
const Author = styled(Typography)`
  color: #878787;
  display: flex;
  margin: 20px 0;
`;

const DetailView = () => {
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const [post, setPost] = useState({});
  const { account } = useContext(dataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const deletePost = async () => {
    let response = await API.deletePostData(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  return (
    <Box>
      <Box>
        <Image src={post.picture || url} alt="post" />
      </Box>
      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <Link to={`/updates/${post._id}`}>
              <EditIcon />
            </Link>
            <DeleteIcon onClick={() => deletePost()} />
          </>
        )}
      </Box>

      <Heading>{post.title}</Heading>
      <Box>
        <Author style={{ margin: "20px" }}>
          Author:
          <span style={{ fontWeight: 600 }}>{post.username}</span>
          <Typography style={{ marginLeft: "auto" }}>
            {new Date(post.createdAt).toDateString()}
          </Typography>
        </Author>
      </Box>
      <Typography style={{ margin: "20px" }}>{post.description}</Typography>

      <Comment post={post} />
    </Box>
  );
};

export default DetailView;
