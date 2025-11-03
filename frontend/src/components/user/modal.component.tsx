import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useMainContext } from "../../context/main.context";
import Button from "../common/button.component";
import { IUser } from "../../types/user.types";
import Input from "../common/input.component";

const Modal = () => {
  const {
    userModalVisible,
    setUserModalVisible,
    saveUser,
    getUser,
    deleteUser,
  } = useMainContext();
  const [currentUser, setCurrentUser] = useState<Partial<IUser> | null>(null);
  const [user, setUser] = useState({ name: "", email: "" });

  const handleOnSave = () => {
    saveUser(user);
    setUserModalVisible(false);
  };

  const handleOnDelete = () => {
    setCurrentUser(null);
    setUser({ name: "", email: "" });
    setUserModalVisible(false);
    deleteUser();
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      setCurrentUser(user);
      setUser(user as IUser);
    }
  }, [getUser]);

  return (
    <div
      className={twMerge(
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        !userModalVisible && "hidden"
      )}
    >
      <div
        className={twMerge(
          "bg-white p-6 rounded-lg shadow-lg relative min-w-sm flex flex-col gap-4"
        )}
      >
        <h4>{currentUser ? `Hi ${currentUser.name}` : "Add User"}</h4>
        <Input
          placeholder="Enter your name"
          value={user?.name}
          disabled={!!currentUser}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input
          placeholder="Enter your email"
          value={user?.email}
          disabled={!!currentUser}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <footer className="flex justify-end gap-2">
          <Button
            onClick={() => setUserModalVisible(false)}
            className="bg-gray-200 text-gray-500"
          >
            Cancel
          </Button>
          {currentUser ? (
            <Button onClick={handleOnDelete} className="bg-red-500">
              Delete
            </Button>
          ) : (
            <Button onClick={handleOnSave}>Save</Button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Modal;
