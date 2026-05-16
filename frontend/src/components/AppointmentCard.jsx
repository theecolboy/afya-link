function AppointmentCard({ appointment }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-bold">{appointment.doctor}</h3>
      <p className="text-gray-600">{appointment.hospital}</p>
      <p className="text-sm text-gray-500">{appointment.date}</p>
      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded">
        {appointment.status}
      </span>
    </div>
  );
}

export default AppointmentCard;