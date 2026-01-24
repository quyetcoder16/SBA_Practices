import React from "react";

class InstructorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // List of Instructor or course number
      instructors: [
        {
          id: 1,
          instructorName: "Le Van Quyet",
          department: "SE",
          status: "Teaching",
        },
        {
          id: 2,
          instructorName: "Tran Khanh Toan",
          department: "CF",
          status: "On Leave",
        },
        {
          id: 3,
          instructorName: "Nguyen Van Minh",
          department: "Math",
          status: "Teaching",
        },
        {
          id: 4,
          instructorName: "Tran Minh Hieu",
          department: "IS",
          status: "Suspended",
        },
        {
          id: 5,
          instructorName: "Vi Van Du",
          department: "AI",
          status: "Teaching",
        },
      ],
    };
  }

  componentDidMount() {
    console.log("Component did mount");
  }

  componentDidUpdate(preState, preProps, snapshot) {}

  componentWillUnmount() {}

  changeStatus(id) {
    const updatedInstrutors = this.state.instructors.map((instructor) => {
      if (instructor.id === id) {
        return {
          ...instructor,
          status:
            instructor.status === "Teaching"
              ? "On Leave"
              : instructor.status === "On Leave"
              ? "Suspended"
              : "Teaching",
        };
      } else {
        return instructor;
      }
    });

    this.setState({ instructors: updatedInstrutors });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Instrcutor List</h2>

          <hr />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Instructor Id</th>
                <th scope="col">Instructor Name</th>
                <th scope="col">Department</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {!this.state.instructors
                ? "No record!"
                : this.state.instructors.map((instructor, index) => (
                    <tr key={instructor.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{instructor.id}</td>
                      <td>{instructor.instructorName}</td>
                      <td>{instructor.department}</td>
                      <td>{instructor.status}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            this.changeStatus(instructor.id);
                          }}
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default InstructorList;
