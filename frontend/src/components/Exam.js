import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExam, deleteExam } from "../actions/exam";
import ExamDataService from "../services/exam.service";

const Exam = (props) => {
  const initialExamState = {
    id: null,
    userId:"",
    ename:"",
    submitted: false
  };
  const [currentExam, setcurrentExam] = useState(initialExamState);
  const [message, setMessage] = useState("");
  const exams = useSelector(state => state.exams);
  const dispatch = useDispatch();

  const getExam = id => {
    if (exams.length !== 0){
      if(exams.filter( x  => x._id=== id)) {
        // TODO: 505 code
      }
      setcurrentExam(exams.filter( x  => x._id=== id)[0]);
    }
    else{
    ExamDataService.getExam(id)
      .then(response => {
        setcurrentExam(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };
  useEffect(() => {
    getExam(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setcurrentExam({ ...currentExam, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateExam(currentExam._id, currentExam))
      .then(response => {
        console.log(response);

        setMessage("The exam was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeExam = () => {
      console.log(currentExam._id);
    dispatch(deleteExam(currentExam._id))
      .then(() => {
        props.history.push("/exams");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentExam ? (
        <div className="edit-form">
          <h4>Exam</h4>
          <form>

            <div className="form-group">
                <label htmlFor="ename">Exam Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="ename"
                    value={currentExam.ename}
                    onChange={handleInputChange}
                    name="ename"
                />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={removeExam}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Exam...</p>
        </div>
      )}
    </div>
  );
};

export default Exam;