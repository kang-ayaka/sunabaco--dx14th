import React from 'react';
import './App.css';
import CalendarPage from './pages/CalendarPage'; // Import CalendarPage

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">往診サポートアプリ (Prototype)</h1>
      </header>
      <main className="p-4 bg-gray-50 min-h-screen">
        <CalendarPage /> {/* Display CalendarPage */}
      </main>
    </div>
  );
}

export default App;
