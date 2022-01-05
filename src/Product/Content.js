import Paper from "@mui/material/Paper";
import Register from "./Register";
import Grid from "./Grid"
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  pageContent: {
    margin: 40,
    padding: 24,
  },
});

const Content = () => {
    const classes = useStyle();
  return (
    <div>
      <Paper className={classes.pageContent}>
        <Grid />
      </Paper>
    </div>
  );
};

export default Content;
