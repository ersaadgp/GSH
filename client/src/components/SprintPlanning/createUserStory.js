import React, { useEffect } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    boxShadow: '50%',
  },
  Paper: {
    textAlign: 'center',
    minWidth: 700,
    width: '50rem',
    padding: '1rem 2rem 1rem 2rem',

    borderRadius: '1rem',
  },
  container: {
    maxHeight: '50vh',
    margin: '1rem',
  },
  action: {},
  Input: {
    marginTop: '1rem',
    width: '30rem',
  },
  Button: {
    margin: '1rem',
    width: '8rem',
  },
};

function PBModal(props) {
  const [description, setDescription] = React.useState('');

  const dispatch = useDispatch();
  const productBacklogbyID = useSelector((state) =>
    Object.values(state.productBacklog)
  );

  const fetchProductBacklogbyID = (pbid) => {
    return async (dispatch) => {
      await apis
        .get(`/product-backlog-item/id/${pbid}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PBITEM_ID,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchProductBacklogbyID(props.pbid));
  }, [props.pbid]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      PBItemID: props.pbid,
      sprintID: props.sprintId,
      description,
    });
    setDescription('');
  };

  const renderTask = (pb, props) => {
    if (pb.PBItemID === props.pbid) {
      return <div>Product Backlog : {pb.description}</div>;
    }
  };

  return (
    <div>
      <Grid
        className={props.classes.gridHeight}
        container
        direction="row"
        justify="center"
      >
        <Paper className={props.classes.Paper} elevation={3}>
          {renderTask(productBacklogbyID[0], props)}

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className={props.classes.Input}
              placeholder="Create User Story"
              value={description}
              onChange={handleDescriptionChange}
            ></TextField>
            <Button
              type="submit"
              className={props.classes.Button}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
export default withStyles(styles)(PBModal);
