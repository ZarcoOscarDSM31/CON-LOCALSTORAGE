import React, { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { Card, Button, Input } from "../components/ui";
import FormPlants from "../components/FormPlants";

function AdminPage() {
  const { getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div>
      <FormPlants />
    </div>
  );
}

export default AdminPage;
