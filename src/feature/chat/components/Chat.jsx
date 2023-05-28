import { observer } from "mobx-react";
import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { io } from "socket.io-client";
import { setChatList } from "../../../store/chatStore";
import SocketContext from "../../../contexts/SocketContext";

/* const messages = [
  {
    id: 1,
    sender: {
      name: "Usuario 1",
    },
    message: "¡Hola! ¿Cómo estás?",
    isCurrentUser: true,
  },
  {
    id: 2,
    sender: {
      name: "Usuario 2",
    },
    message: "¡Hola! Estoy bien, ¿y tú?",
    isCurrentUser: true,
  },
  {
    id: 3,
    sender: {
      name: "Usuario 1",
    },
    message: "¡Todo bien! ¿Qué has hecho hoy?",
    isCurrentUser: true,
  },
  {
    id: 4,
    sender: {
      name: "Usuario 2",
    },
    message: "He salido a caminar y luego he leído un libro.",
    isCurrentUser: true,
  },
  // Agrega más mensajes aquí
];
 */
const Message = ({ sender, message, isCurrentUser }) => {
  return (
    <div
      className={`flex items-start mb-4 ${isCurrentUser ? "justify-end" : ""}`}
    >
      {!isCurrentUser && (
        <div className="flex-shrink-0 flex justify-center">
          <FaUserCircle className="h-8 w-8 text-gray-500" />
        </div>
      )}
      <div className={`ml-3 ${isCurrentUser ? "mr-3" : ""}`}>
        <div
          className={`bg-${
            isCurrentUser ? "[#d1d1d1]" : "[#14B0FF]"
          }  px-4 py-2 rounded-lg shadow`}
          style={{
            color: isCurrentUser ? "black" : "white",
            backgroundColor: isCurrentUser ? "#f1f1f1" : "#143bff",
          }}
        >
          <p className="text-sm">{message}</p>
        </div>
      </div>
      {isCurrentUser && (
        <div className="flex-shrink-0">
          <FaUserCircle className="h-8 w-8 text-gray-500" />
        </div>
      )}
    </div>
  );
};

const Chat = () => {
  const [conectado, setConectado] = React.useState(false);
  const [mensajes, setMensajes] = React.useState([]);
  const [mensaje, setMensaje] = React.useState("");

  const socket = useContext(SocketContext);

  const enviarMensaje = (e) => {
    /*     e.preventDefault(); */
    socket.emit("mensaje", mensaje);
    setMensaje("");
  };
  React.useEffect(() => {
    // Establece la conexión con el servidor WebSocket

    // Maneja los eventos del socket

    socket.on("connect", () => {
      setConectado(true);
      console.log("Conexión establecida");
    });
    socket.on("nuevo-cliente", (clientes) => {
      const listaClientes = clientes.map((cliente) => ({ id: cliente }));
      setChatList(listaClientes);
    });

    socket.on("mensajes", (data) => {
      setMensajes(data);
    });

    // Cierra la conexión cuando el componente se desmonta
    return () => {
      socket.on("disconnect", () => {
        setConectado(false);
        console.log("Conexión cerrada");
      });
    };
  });
  return (
    <div className="max-w-md mx-auto bg-gray-200 rounded-lg shadow-md">
      <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex items-center">
        <div
          className={`h-2 w-2 rounded-full ${
            conectado ? "bg-green-500" : "bg-red-500"
          } mr-2`}
        />
        <h3 className="text-lg font-semibold text-gray-800">Chat</h3>
      </div>
      <div className="px-4 py-3">
        {mensajes.map((message, index) => (
          <Message
            key={index}
            /*   sender={message.sender} */
            message={message}
            isCurrentUser={true}
          />
        ))}
      </div>
      <div className="bg-gray-100 px-4 py-3 rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            className="w-full rounded-lg py-2 px-3 mr-2"
            placeholder="Escribe tu mensaje..."
            value={mensaje}
            onChange={(e) => {
              setMensaje(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={() => {
              enviarMensaje();
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(Chat);
