import React, { useRef, useState } from "react";
import { deleteTodoFetch, updateTodoFetch } from "services/todo";
import styles from "./TodoList.module.css";

const TodoList = ({ id, todo, isCompleted, authToken, fetchTodo }) => {
	const [editMode, setEditMode] = useState(false);
	const [IsChecked, setIsChcekd] = useState(false);
	const editRef = useRef();
	const checkedRef = useRef();
	console.log(isCompleted);
	// console.log("checkedRef", checkedRef.current.checked);

	const handleDeleteTodo = () => {
		deleteTodoFetch(authToken, id);
		fetchTodo();
	};

	const handleChangeCheckBox = (e) => {
		const checked = e.target.checked;
		setIsChcekd(checked);
	};

	const handleUpdatedTodo = async () => {
		const updatedTodo = await editRef.current.value;
		console.log(updatedTodo);
		await updateTodoFetch(authToken, id, updatedTodo, IsChecked);
		setEditMode(false);
		await fetchTodo();
	};

	return (
		<div className={styles.todo} key={id}>
			<div>
				<span>{id}</span>
				<input
					ref={checkedRef}
					onChange={handleChangeCheckBox}
					type='checkbox'
					checked={IsChecked}
					className={styles.checkBox}
				/>

				{editMode ? (
					<input
						defaultValue={todo}
						ref={editRef}
						type='text'
						className={styles.editMode}
					/>
				) : (
					<label className={styles.label}>{todo}</label>
				)}
			</div>
			<div className={styles.buttons}>
				<button
					onClick={editMode ? handleUpdatedTodo : () => setEditMode(true)}
					className={styles.editButton}
				>
					{editMode ? "완료" : "수정"}
				</button>
				<button
					onClick={editMode ? () => setEditMode(false) : handleDeleteTodo}
					className={styles.deleteButton}
				>
					{editMode ? "취소" : "삭제"}
				</button>
			</div>
		</div>
	);
};

export default React.memo(TodoList);
