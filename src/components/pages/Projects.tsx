import { useEffect, useState } from "react";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/projects")
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((p, index) => (
                    <li key={index}>{p.domain || JSON.stringify(p)}</li>
                ))}
            </ul>
        </div>
    );

}

export default Projects