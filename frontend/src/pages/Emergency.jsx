function Emergency() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Emergency Services</h1>
      <div className="bg-red-100 p-6 rounded-lg">
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold">
          SOS - Call Ambulance
        </button>
      </div>
    </div>
  );
}

export default Emergency;