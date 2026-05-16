function EmergencyButton() {
  const handleEmergency = () => {
    // Emergency logic will be added
    alert("Emergency services called!");
  };

  return (
    <button
      onClick={handleEmergency}
      className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
    >
      SOS - Emergency
    </button>
  );
}

export default EmergencyButton;