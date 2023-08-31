import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { dataContext } from "../../../Context/dataProvider";
import { API } from "../../service/api";
import SingleComment from "./SingleComment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;
const Image = styled("img")({
  width: "500",
  height: "500",
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;
const initialValue = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

export const Comment = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";
  const [comment, setComment] = useState(initialValue);
  const [allcomment, setAllComment] = useState([]);
  const { account } = useContext(dataContext);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const postComment = async () => {
    let response = await API.postCommentData(comment);
    console.log("comment res:", response);
    setComment(" ");
    if (response.isSuccess) {
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComment(post._id);
      if (response.isSuccess) {
        setAllComment(response.data);
        console.log("This is response from getData", allcomment);
      }
    };
    getData();
  }, [post]);

  return (
    <Box>
      <Container>
        <Image src={url} alt="per" />

        <StyledTextArea
          minRows={5}
          placeholder="Write you thoughts..."
          onChange={(e) => handleChange(e)}
        ></StyledTextArea>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => postComment()}
          style={{ height: 40 }}
        >
          Post
        </Button>
      </Container>

      <Box>
        <SingleComment allcomment={allcomment} />
      </Box>
    </Box>
  );
};
