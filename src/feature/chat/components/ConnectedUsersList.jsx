import { observer } from "mobx-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { chatStore } from "../../../store/chatStore";

const ConnectedUsersList = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="bg-gray-100 px-4 py-3 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-800">
          Usuarios Conectados
        </h3>
      </div>
      <div className="px-4 py-3">
        {chatStore.chatList.map((user) => (
          <div key={user.id} className="flex items-center py-2">
            <FaUserCircle className="h-6 w-6 text-gray-500 mr-2" />
            <span>{user.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(ConnectedUsersList);
