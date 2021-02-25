/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Col,
  Nav,
  Row,
  Form,
  Label,
  Input,
  Table,
  Badge,
  Button,
  Navbar,
  NavLink,
  NavItem,
  FormGroup,
  NavbarBrand,
} from 'reactstrap';

export default function TableToDo() {
  const history = useHistory();

  const [allValues, setAllValues] = React.useState({
    data: [],
    isEditable: null,
    isCompleted: false,
    isCompletedUpdate: false,
    newName: null,
    newDescription: null,
  });

  /**
   * Use this function to modify state variables
   * @param {object} value
   */
  const changeHandler = (value) => {
    setAllValues({ ...allValues, ...value });
  };

  /**
   * Disconnect and go to login page
   */
  const Logout = () => {
    localStorage.setItem('isLogged', false);
    history.push('/');
  };

  /**
   * Add new task to localStorage
   * @param {object} e
   */
  const addTask = (e) => {
    e.preventDefault();
    const inputValue = {
      nom: e.target.nom.value,
      desc: e.target.description.value,
      isCompleted: allValues.isCompleted,
    };
    changeHandler({ data: [...allValues.data, inputValue] });
    localStorage.setItem('data', JSON.stringify([...allValues.data, inputValue]));
  };

  /**
   * update info of one task selected
   * @param {object} e
   */
  const updateForm = (e) => {
    e.preventDefault();
    const inputValue = {
      nom: allValues.newName,
      desc: allValues.newDescription,
      isCompleted: allValues.isCompletedUpdate,
    };
    const newData = [...allValues.data];
    newData[allValues.isEditable] = inputValue;
    localStorage.setItem('data', JSON.stringify(newData));
    changeHandler({ data: newData, isEditable: null });
  };

  /**
   * delete task selected
   */
  const deleteData = () => {
    const newData = [...allValues.data];
    const filteredData = newData.filter((input, index) => index !== allValues.isEditable);
    changeHandler({ data: filteredData, isEditable: null });
    localStorage.setItem('data', JSON.stringify(filteredData));
  };

  /**
   * Display fields to modify the information of a task
   * @param {number} index
   */
  const edit = (index) => {
    if (index === allValues.isEditable) {
      changeHandler({
        isEditable: null,
        newName: null,
        newDescription: null,
        isCompletedUpdate: null,
      });
    } else {
      changeHandler({
        isEditable: index,
        newName: allValues.data[index].nom,
        newDescription: allValues.data[index].desc,
        isCompletedUpdate: allValues.data[index].isCompleted,
      });
    }
  };

  /**
   * If there are tasks in localStorage add to local parameter
   */
  React.useEffect(() => {
    let check = localStorage.getItem('data');
    check = JSON.parse(check);
    if (Array.isArray(check) && check.length > 0) {
      changeHandler({ data: check });
    }
  }, []);

  return (
    <div className="todo-wrapper">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="#">Todo List</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Tasks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => Logout()}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <div className="m-5">
        <Form inline onSubmit={(e) => addTask(e)}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label htmlFor="nom" className="mr-sm-2">Task name</Label>
            <Input
              size="sm"
              type="text"
              name="nom"
              id="nom"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label htmlFor="description" className="mr-sm-2">Description</Label>
            <Input
              size="sm"
              type="text"
              name="description"
              id="description"
            />
          </FormGroup>
          <FormGroup check className="mb-2 mr-sm-2 mb-sm-0">
            <Label check>
              <Input
                type="checkbox"
                name="radioIsCompleted"
                checked={allValues.isCompleted}
                onChange={() => changeHandler({ isCompleted: !allValues.isCompleted })}
              />
              {' '}
              Task is completed
            </Label>
          </FormGroup>
          <Button type="submit" size="sm" color="success">
            Add task
          </Button>
        </Form>

        <div className="data mt-3">
          <h3>Task List</h3>
          <Table size="sm" hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name of task</th>
                <th>Description</th>
                <th>Is completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allValues.data.map((input, index) => (
                <tr key={index.toString()}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {input.nom}
                  </td>
                  <td>
                    {input.desc}
                  </td>
                  <td>
                    {
                      input.isCompleted
                        ? <Badge color="success">completed</Badge>
                        : <Badge color="danger">not completed</Badge>
                    }
                  </td>
                  <td>
                    <Row>
                      <Col xs="1" sm="1" md="1" lg="1" xl="1">
                        <Button onClick={() => edit(index)} size="sm" className="mr-1">Edit</Button>
                      </Col>
                      <Col xs="11" sm="11" md="11" lg="11" xl="11">
                        <div
                          style={{ display: `${allValues.isEditable !== index ? 'none' : 'block'}` }}
                        >
                          <Form onSubmit={(e) => updateForm(e)}>
                            <Row>
                              <Col xs="3" sm="3" md="3" lg="3" xl="3">
                                <Input
                                  type="text"
                                  name="nom"
                                  id="nom"
                                  size="sm"
                                  placeholder="Name"
                                  value={allValues.newName}
                                  onChange={(event) => changeHandler({ newName: event.target.value })}
                                />
                              </Col>
                              <Col xs="3" sm="3" md="3" lg="3" xl="3">
                                <Input
                                  size="sm"
                                  type="text"
                                  name="description"
                                  id="description"
                                  placeholder="Description"
                                  value={allValues.newDescription}
                                  onChange={(event) => changeHandler({ newDescription: event.target.value })}
                                />
                              </Col>
                              <Col xs="3" sm="3" md="3" lg="3" xl="3">
                                <FormGroup check className="mb-2 mr-sm-2 mb-sm-0">
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      name="radioIsCompleted"
                                      checked={allValues.isCompletedUpdate}
                                      onChange={() => changeHandler({ isCompletedUpdate: !allValues.isCompletedUpdate })}
                                    />
                                    {' '}
                                    Task is completed
                                  </Label>
                                </FormGroup>
                              </Col>
                              <Col xs="1" sm="1" md="1" lg="1" xl="1">
                                <Button type="submit" size="sm" color="primary">update</Button>
                              </Col>
                              <Col xs="1" sm="1" md="1" lg="1" xl="1">
                                <Button type="button" onClick={() => deleteData()} size="sm" color="danger">
                                  Delete
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
