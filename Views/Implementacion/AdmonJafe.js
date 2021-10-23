import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Row, Col, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import DataTable from 'react-data-table-component'

import BreadCrumbs from '@components/breadcrumbs'
import { ChevronDown, Edit, Plus, MoreVertical, FileText, Archive, Trash } from 'react-feather'
import Avatar from '@components/avatar'

import { useHistory } from 'react-router-dom'
import CardTitle from 'reactstrap/lib/CardTitle'
import CardBody from 'reactstrap/lib/CardBody'
import axios from 'axios'

const UserList = () => {

    const history = useHistory()

    const [data1, setData1] = useState([])
    const [text1, setText1] = useState("")
    const [text2, setText2] = useState("")
    const [text3, setText3] = useState("")
    const [text4, setText4] = useState("")
    const [text5, setText5] = useState("")
    const [mensajeError, setMensajeError] = useState("")


    const [isLoading, setIsLoading] = useState(true)
    const [usuarios, setUsuarios] = useState(1)
    const [modal, setModal] = useState(false)

    const handleModal = () => setModal(!modal)


    const [refreshTable, setRefreshTable] = useState(false)

    useEffect(() => {

        fetch("https://backmotos.herokuapp.com/person", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "get"
        }).then((res) => res.json()).then(data => {
            const datos = []
            for (let i = 0; i < data.length; i++) {
                for (let k = 0; k < data[i].vehicles.length; k++) {
                    datos.push({ dueno: data[i].name, apellido: data[i].lastName, documento: data[i].document, placa: data[i].vehicles[k].plate, estado: data[i].vehicles[k].state })
                }
            }
            console.log("sadasd")
            console.log(data)
            console.log("sadasd")
            console.log(datos)
            setData1(datos)
            setIsLoading(false)

        })
            .catch((error) => {
                console.error(error)
                setData1([])
                setIsLoading(false)
            })

        // fetch(`https://reqres.in/api/users?page=${usuarios}`, {
        //     method: 'GET'
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data.data[0])
        //         setData1(data.data)
        //         setIsLoading(false)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //         setData1([])
        //         setIsLoading(false)
        //     })
    }, [refreshTable])

    const CrearUnRegistro = async () => {
        //    await fetch(`https://backmotos.herokuapp.com/person/sendForm`, {
        //         method: 'POST',
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         mode: 'no-cors',
        //         body: JSON.stringify({
        //             document: text4.text4,
        //             name: text1.text1,
        //             secondaryName: text2.text2,
        //             lastName: text3.text3,
        //             plate: text5.text5
        //         })
        //     }).then((response) => response.json())
        //         .then((responseJson) => {
        //             console.log(responseJson)
        //         })
        //         .catch((error) => {
        //             console.error(error)
        //         })

        const body = {
            document: text4.text4,
            name: text1.text1,
            secondaryName: text2.text2,
            lastName: text3.text3,
            plate: text5.text5
        }
        // const body = {
        //     document: "asdasdasdasdasdasdasdasd",
        //     name: "asdasd",
        //     secondaryName: "ooooo",
        //     lastName: "oo.ooo",
        //     plate: "text5.teooooooooooooxt5"
        // }
        // console.log
        console.log(body)
        await axios.post("https://backmotos.herokuapp.com/person/sendForm", body)
            .then((res) => {
                console.log(res)
                // setMensajeError("Placa ya en uso.")
                setRefreshTable(!refreshTable)
                setText1("")
                setText2("")
                setText3("")
                setText4("")
                setText5("")
                setMensajeError("")
        
                handleModal()
            
            }).catch((err) => {
                setMensajeError("Placa ya en uso o input incorrecto.")
            })
    }

    const CambiarEstado = async (id, estado) => {
        console.log("Cambiar estao")

        const body = {
            plate: id,
            state: estado
        }
        console.log(body)
        await axios.post("https://backmotos.herokuapp.com/vehicle/changeVehicle", body).then((res) => {
            console.log(res)
            setRefreshTable(!refreshTable)
        })
            .catch((error) => {
                console.error(error)
            })
    }


    const columns = [
        {
            name: 'Nombre',
            selector: 'dueno',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'Apellido',
            selector: 'apellido',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: 'Documento',
            selector: 'documento',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: 'Placa',
            selector: 'placa',
            sortable: true,
            minWidth: '150px'
        },

        {
            name: 'Estado',
            selector: 'email',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                if (row.estado === "En Revisión") {
                    return (
                        <Badge color="primary" pill>
                            {row.estado}
                        </Badge>
                    )
                } else if (row.estado === "En Reparación") {
                    return (
                        <Badge color="warning" pill>
                            {row.estado}
                        </Badge>
                    )
                } else {
                    return (
                        <Badge color="success" pill>
                            {row.estado}
                        </Badge>
                    )
                }
            }

        },
        {
            name: 'Editar',
            allowOverflow: true,
            cell: row => {
                return (
                    <div className='d-flex '>
                        <UncontrolledDropdown >
                            <DropdownToggle className='pr-1' tag='span'>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='w-100'
                                    onClick={async () => {
                                        CambiarEstado(row.placa, "En Revisión")
                                    }}
                                >
                                    <FileText size={15} />
                                    <span className='align-middle ml-50'>En revisión</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'
                                    onClick={async () => {
                                        CambiarEstado(row.placa, "En Reparación")
                                    }}
                                >
                                    <Archive size={15} />
                                    <span className='align-middle ml-50'>En reparación</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'
                                    onClick={async () => {
                                        CambiarEstado(row.placa, "Para Entregar")
                                    }}
                                >
                                    <Trash size={15} />
                                    <span className='align-middle ml-50'>Para Entregar</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                )
            }
        }
    ]

    return isLoading ? (
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>) : (

        <Fragment>
            <BreadCrumbs breadCrumbTitle='Admon' breadCrumbParent='Admon' />

            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Vehículos Registrados</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <Button id = "botonadmon" className='ml-2' color='primary' onClick={handleModal}>
                            <Plus size={15} />
                            <span className='align-middle ml-50'>Agregar Registro</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardBody >


                    <DataTable
                        title=" asdasd"
                        noHeader
                        highlightOnHover
                        striped
                        search
                        style={{ overflow: "visible" }}
                        theme='light'
                        data={data1}
                        columns={columns}
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
                </CardBody>
            </Card>

            <Modal
                isOpen={modal}
                toggle={() => handleModal()}
                className='modal-dialog-centered'
                // modalClassName={item.modalColor}
                key="asdasd"
            >
                <ModalHeader toggle={() => handleModal()}>Crear Nuevo Registro</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='text'>Primer Nombre:</Label>
                        <Input onChange={e => setText1({ text1: e.target.value })} type='text' id='text' placeholder='Primer Nombre' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='text'>Segundo Nombre:</Label>
                        <Input onChange={e => setText2({ text2: e.target.value })} type='text' id='text1' placeholder='Segundo Nombre' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='text'>Apellido:</Label>
                        <Input onChange={e => setText3({ text3: e.target.value })} type='text' id='text4' placeholder='Apellido' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='text'>Cédula:</Label>
                        <Input onChange={e => setText4({ text4: e.target.value })} type='text' id='text2' placeholder='Cédula' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='text'>Placa:</Label>
                        <Input onChange={e => setText5({ text5: e.target.value })} type='text' id='text3' placeholder='Placa' />
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <h6 className="text-danger" id="mensajeError"> {mensajeError} </h6>
                    <Row>
                        <Col>
                            <Button color='primary' onClick={() => handleModal()}>
                                Cancelar
                            </Button></Col>
                        <Col>
                            <Button id = "pruebasss" color='primary' onClick={async () => {
                                CrearUnRegistro()
                            }}>
                                Crear
                            </Button></Col>


                    </Row>

                </ModalFooter>
            </Modal>

            <h1></h1>
        </Fragment>
    )
}
export default UserList
