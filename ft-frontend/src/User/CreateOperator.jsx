import React, { useState } from 'react';
import axios from 'axios';

const CreateOperator = () => {
  const [operators, setOperators] = useState([]);
  const [newOperatorName, setNewOperatorName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateOperator = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = { name: newOperatorName };

      const response = await axios.post(
        'http://localhost:5000/api/user/operator',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setOperators([...operators, response.data]);
      setNewOperatorName('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating operator:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <select>
        <option value="">Select Operator</option>
        {operators.map((operator) => (
          <option key={operator.id} value={operator.name}>
            {operator.name}
          </option>
        ))}
      </select>
      <button onClick={() => setIsDialogOpen(true)}>+</button>

      {isDialogOpen && (
        <div>
          <div>
            <h3>Create New Operator</h3>
            <input
              type="text"
              value={newOperatorName}
              onChange={(e) => setNewOperatorName(e.target.value)}
            />
            <button onClick={handleCreateOperator}>Create</button>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOperator;
