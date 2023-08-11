// import {
//   Button,
//   Table,
//   TableBody,
//   TableHead,
//   TableCell,
//   TableRow,
// } from "@mui/material";

// import { DataByCategories } from "../../constants/Data";

// const Categories = () => {
//   return (
//     <>
//       <Button>Create Blog</Button>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>All Categories</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {DataByCategories.map((Category) => (
//             <TableRow key={Category.id}>
//               <TableCell>{Category.type}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </>
//   );
// };
// export default Categories;

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import DataByCategories from "../../constants/Data.js";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid black;
`;
const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background-color: black;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <>
      <StyledLink to={`/create?category=${category || " "}`}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Check if DataByCategories is not empty before rendering */}
          {DataByCategories().length > 0 ? (
            DataByCategories().map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <StyledLink to={`/?category=${category.type}`}>
                    {category.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // Show message if DataByCategories is empty
            <TableRow>
              <TableCell>No categories found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
