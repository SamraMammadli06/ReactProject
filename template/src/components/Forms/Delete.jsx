import { Form, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../redux/slices/tasksSlice";
import { Delete } from "../../tasks";

function DeleteTaskForm({ task }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteClick = async (e) => {
        dispatch(deleteTask({ id: task.id }));
        await Delete(task.id);
        navigate('/');
    };

    return (
        <>
            <Form method="post" action={`tasks/${task.id}/destroy`}>
                <button onClick={handleDeleteClick} type="submit">
                    Delete
                </button>
            </Form>
        </>
    );
}

export default DeleteTaskForm;
