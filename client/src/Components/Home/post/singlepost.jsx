import { Box, Typography, styled } from "@mui/material";
import alternativeImage from "../../Assets/alternative.jpg";
import { addElipsis } from "../../../utils/common-utils";

const Container = styled(Box)`
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  :hover {
    transform: scale(1.03);
  }
`;
const Image = styled("img")`
  width: 100%;
  height: 70%;

  border: 1px solid black;
  border-radius: 10px;
`;
const Title = styled(Typography)`
  font-weight: bold;
`;
const Category = styled(Typography)`
  font-size: small;
`;
const Description = styled(Typography)`
  font-size: 18px;
`;

const SinglePost = ({ posts }) => {
  const url = posts.picture ? posts.picture : alternativeImage;
  return (
    <Container>
      <Image src={url} alt="blog" />

      <Category>{posts.category}</Category>

      <Title>{addElipsis(posts.title, 20)}</Title>
      <Category>{posts.username}</Category>
      <Description>{addElipsis(posts.description, 50)}</Description>
    </Container>
  );
};
export default SinglePost;
