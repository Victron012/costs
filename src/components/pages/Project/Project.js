import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../../layouts/Loading/Loading'
import Container from '../../layouts/Container/Container'
import ProjectForm from '../../projects/ProjectForm/ProjectForm'
import Message from '../../layouts/Message/Message'
import ServiceForm from '../../services/ServiceForm/ServiceForm'
import {parse, v4 as uuidv4} from 'uuid'

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
                    setServices(data.services)
                })
        }, 500)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function createService(project){
        setMessage()
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost>parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setMessageType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp)=>resp.json())
        .then((data)=>{
            //exibir os servicos
            console.log(data)
        })
        .catch(err=>console.log(err))

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

        setMessage()
    }

    function removeService(){

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
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.lenght > 0 }
                        {services.length == 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default Project