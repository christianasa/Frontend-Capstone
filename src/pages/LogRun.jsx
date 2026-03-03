import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LogRun.css';

const API = 'http://localhost:3000';

function LogRun() {
  const [runs, setRuns] = useState([]);
  const [editingRun, setEditingRun] = useState(null);
  const [form, setForm] = useState({
    date: '',
    distance_miles: '',
    duration_minutes: '',
    runType: 'Easy',
    notes: '',
  });

  const fetchRuns = async () => {
    try {
      const res = await axios.get(`${API}/runs`);
      setRuns(res.data);
    } catch (err) {
      console.error('Failed to fetch runs', err);
    }
  };

  useEffect(() => { fetchRuns(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRun) {
        await axios.put(`${API}/runs/${editingRun._id}`, form);
        setEditingRun(null);
      } else {
        await axios.post(`${API}/runs`, form);
      }
      setForm({ date: '', distance_miles: '', duration_minutes: '', runType: 'Easy', notes: '' });
      fetchRuns();
    } catch (err) {
      console.error('Failed to save run', err);
    }
  };

  const handleEdit = (run) => {
    setEditingRun(run);
    setForm({
      date: run.date?.slice(0, 10),
      distance_miles: run.distance_miles,
      duration_minutes: run.duration_minutes,
      runType: run.runType,
      notes: run.notes || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this run?')) return;
    try {
      await axios.delete(`${API}/runs/${id}`);
      fetchRuns();
    } catch (err) {
      console.error('Failed to delete run', err);
    }
  };

  const handleCancel = () => {
    setEditingRun(null);
    setForm({ date: '', distance_miles: '', duration_minutes: '', runType: 'Easy', notes: '' });
  };

  return (
    <div className="log-run">
      <h1>{editingRun ? 'Edit Run' : 'Log a Run'}</h1>

      <div className="run-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Distance (miles)</label>
              <input type="number" name="distance_miles" value={form.distance_miles} onChange={handleChange} placeholder="e.g. 3.5" step="0.1" required />
            </div>
            <div className="form-group">
              <label>Duration (minutes)</label>
              <input type="number" name="duration_minutes" value={form.duration_minutes} onChange={handleChange} placeholder="e.g. 35" required />
            </div>
          </div>
          <div className="form-group">
            <label>Run Type</label>
            <select name="runType" value={form.runType} onChange={handleChange}>
              <option>Easy</option>
              <option>Tempo</option>
              <option>Long</option>
              <option>Race</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="How did it feel?" rows={3} />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {editingRun ? 'Update Run' : 'Submit Run'}
            </button>
            {editingRun && (
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <h2>Past Runs</h2>
      {runs.length === 0 ? (
        <p className="no-runs">No runs logged yet. Add your first one above!</p>
      ) : (
        <table className="runs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(run => (
              <tr key={run._id}>
                <td>{new Date(run.date).toLocaleDateString()}</td>
                <td>{run.distance_miles} mi</td>
                <td>{run.duration_minutes} min</td>
                <td>{run.runType}</td>
                <td>{run.notes || '—'}</td>
                <td className="action-buttons">
                  <button className="btn-edit" onClick={() => handleEdit(run)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(run._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LogRun;