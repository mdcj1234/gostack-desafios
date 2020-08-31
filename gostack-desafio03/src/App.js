import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: "http://meurepositorio.com.br",
      techs: ['NodeJS', 'ReactJS']
    });

    const repoitory = response.data;
    setRepositories([...repositories, repoitory]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(project => project.id === id);
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
