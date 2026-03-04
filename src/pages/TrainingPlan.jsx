import React, { useState } from 'react';
import './TrainingPlan.css';

const trainingPlan = [
  { week: 1, runs: [{ day: 'Monday', type: 'Easy Run', distance: '3 mi' }, { day: 'Wednesday', type: 'Easy Run', distance: '3 mi' }, { day: 'Saturday', type: 'Long Run', distance: '4 mi' }] },
  { week: 2, runs: [{ day: 'Monday', type: 'Easy Run', distance: '3 mi' }, { day: 'Wednesday', type: 'Tempo', distance: '4 mi' }, { day: 'Saturday', type: 'Long Run', distance: '5 mi' }] },
  { week: 3, runs: [{ day: 'Monday', type: 'Easy Run', distance: '4 mi' }, { day: 'Wednesday', type: 'Tempo', distance: '4 mi' }, { day: 'Saturday', type: 'Long Run', distance: '6 mi' }] },
  { week: 4, runs: [{ day: 'Monday', type: 'Easy Run', distance: '3 mi' }, { day: 'Wednesday', type: 'Easy Run', distance: '3 mi' }, { day: 'Saturday', type: 'Long Run', distance: '5 mi' }] },
  { week: 5, runs: [{ day: 'Monday', type: 'Easy Run', distance: '4 mi' }, { day: 'Wednesday', type: 'Tempo', distance: '5 mi' }, { day: 'Saturday', type: 'Long Run', distance: '7 mi' }] },
  { week: 6, runs: [{ day: 'Monday', type: 'Easy Run', distance: '4 mi' }, { day: 'Wednesday', type: 'Tempo', distance: '5 mi' }, { day: 'Saturday', type: 'Long Run', distance: '8 mi' }] },
];

function TrainingPlan() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [completed, setCompleted] = useState({});

  const currentWeek = trainingPlan.find(w => w.week === selectedWeek);

  const toggleComplete = (day) => {
    const key = `${selectedWeek}-${day}`;
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="training-plan">
      <h1>6-Week Half Marathon Training Plan</h1>

      <div className="week-selector">
        {trainingPlan.map(w => (
          <button
            key={w.week}
            className={`week-btn ${selectedWeek === w.week ? 'active' : ''}`}
            onClick={() => setSelectedWeek(w.week)}
          >
            Week {w.week}
          </button>
        ))}
      </div>

      <div className="schedule">
        <h2>Week {selectedWeek}</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Type</th>
              <th>Distance</th>
              <th>Done?</th>
            </tr>
          </thead>
          <tbody>
            {currentWeek.runs.map(run => {
              const key = `${selectedWeek}-${run.day}`;
              return (
                <tr key={run.day} className={completed[key] ? 'completed-row' : ''}>
                  <td>{run.day}</td>
                  <td>{run.type}</td>
                  <td>{run.distance}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!completed[key]}
                      onChange={() => toggleComplete(run.day)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrainingPlan;