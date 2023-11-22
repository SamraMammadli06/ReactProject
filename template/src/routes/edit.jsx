import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import EditTaskForm from "../components/Forms/Edit";
import { updateTask } from "../tasks";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updated = Object.fromEntries(formData);

    updateTask(params.taskId, updated)
    return redirect(`/tasks/${params.taskId}`);
}

function EditTask() {

    return (
        <EditTaskForm />
    );
}

export default EditTask;