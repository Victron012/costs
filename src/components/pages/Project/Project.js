import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../../layouts/Loading/Loading'
import Container from '../../layouts/Container/Container'
import ProjectForm from '../../projects/ProjectForm/ProjectForm'
import Message from '../../layouts/Message/Message'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': ' application/json',
                },
            }).then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                })
        }, 500)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project){
        //budget validation
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setMessageType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data)=>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setMessageType('success')
        })
        .catch(err => console.log(err))
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={messageType} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm
                                    handleSubmit={editPost}
                                    btnText="Concluir edição"
                                    projectData={project}
                                />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default Project