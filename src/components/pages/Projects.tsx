import axios from "axios";
import { useEffect, useState } from "react";

type Project = {
  domain?: string;
  [key: string]: any;
};

const Projects = () => {
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/projects")
      .then((res) =>{
        console.log(res.data); // { count of domains: 6, domains: [...] }
        setProjects(res.data.domains || []);
    })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <h1>Domains</h1>
      <ul>
        {projects.map((domain, index) => (
          <li key={index}>{domain}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
