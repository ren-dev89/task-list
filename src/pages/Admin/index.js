import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const Admin = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [user, setUser] = useState({});
  const [userTasks, setUserTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});

  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;

    const loadTasks = async () => {
      const lsObject = localStorage.getItem("tasklist@detailsUser");
      const userDetails = JSON.parse(lsObject);
      setUser(userDetails);

      const tasksRef = collection(db, "tasks");
      const q = query(
        tasksRef,
        orderBy("created", "desc"),
        where("userUid", "==", userDetails.uid)
      );
      onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            description: doc.data().description,
            userUid: doc.data().userUid,
          });
        });

        setUserTasks(list);
      });
    };

    loadTasks();
    didLoad.current = true;
  }, []);

  const handleRegisterTask = async (e) => {
    e.preventDefault();

    if (!taskDescription) {
      alert("Digite sua tarefa!");
      return;
    }

    if (selectedTask?.id) {
      handleEditTask();
      return;
    }

    await addDoc(collection(db, "tasks"), {
      description: taskDescription,
      created: new Date(),
      userUid: user.uid,
    })
      .then(() => {
        console.log("Tarefa registrada");
        setTaskDescription("");
      })
      .catch((error) => {
        alert("ERRO AO REGISTRAR TAREFA");
        console.log("Error handleRegisterTask: " + error);
      });
  };

  const handleEditTask = async () => {
    const docRef = doc(db, "tasks", selectedTask.id);
    await updateDoc(docRef, { description: taskDescription })
      .then(() => {
        console.log("Tarefa atualizada");
        setTaskDescription("");
        setSelectedTask({});
      })
      .catch((error) => {
        alert("ERRO AO ATUALIZAR");
        console.log("handleEditTask error: " + error);
        setTaskDescription("");
        setSelectedTask({});
      });
  };

  const handleDeleteTask = async (id) => {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef)
      .then(() => {
        console.log("Tarefa excluída");
      })
      .catch((error) => {
        alert("ERRO AO EXCLUIR TAREFA");
        console.log("handleDeleteTask error: " + error);
      });
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const editTask = (task) => {
    setTaskDescription(task.description);
    setSelectedTask(task);
  };

  return (
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>

      <form className="form">
        <textarea
          placeholder="Digite sua tarefa..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button
          onClick={handleRegisterTask}
          style={selectedTask?.id && { backgroundColor: "#6add39" }}
        >
          {selectedTask?.id ? "Atualizar" : "Registrar"} tarefa
        </button>
      </form>

      <div className="list">
        {userTasks.map((task) => (
          <article key={task.id}>
            <p>{task.description}</p>
            <div>
              <button onClick={() => editTask(task)}>Editar</button>
              <button
                className="btn-delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};

export default Admin;
