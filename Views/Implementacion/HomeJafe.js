import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col, CardText, CardTitle, Badge, Modal, ModalHeader, ModalBody, ModalFooter, CardImg, ListGroup, ListGroupItem, Button, CardBody, Card, FormGroup, Label, Input } from 'reactstrap'
import coverImg from '@src/assets/images/banner/banner-16.jpg'
import { Minus, Truck, ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

import imgg1 from '@src/assets/images/slider/04.jpg'
import imgg2 from '@src/assets/images/slider/03.jpg'
import imgg3 from '@src/assets/images/slider/06.jpg'
import img1 from '@src/assets/images/banner/banner-1.jpg'
import img2 from '@src/assets/images/banner/banner-2.jpg'
import img3 from '@src/assets/images/banner/banner-4.jpg'
import axios from 'axios'
import Avatar from '@components/avatar'
import img11 from "../../assets/images/avatars/1.png"
import img12 from "../../assets/images/avatars/2.png"
import img13 from "../../assets/images/avatars/3.png"

const Homee = () => {


    const [text1, setText1] = useState("")
    const [modal, setModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data1, setData1] = useState([])


    const handleModal = () => setModal(!modal)
    useEffect(() => {
    }, [refreshTable])


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

        }
    ]

    return (

        <Fragment>

            <Card className='card-profile'>
                <CardImg className='img-fluid' src={coverImg} top />
                <CardBody>
                    <h3>{"Revisa el estado de tu vehículo."}</h3>

                    <h6 className='text-muted'>{"Busca por tu documento de identidad."}</h6>
                    <FormGroup>
                        {/* <Label for='text'>Primer Nombre:</Label> */}
                        <Input onChange={e => setText1({ text1: e.target.value })} type='text' id='text' placeholder='Documento' />
                    </FormGroup>
                    <Button color='primary' onClick={async () => {
                        // CrearUnRegistro()
                        setIsLoading(true)
                        const body = {
                            document: text1.text1.toString()
                        }
                        console.log(body)
                        await axios.post("https://backmotos.herokuapp.com/person/getByDocument", body)
                            .then((res) => {
                                const datos = []

                                for (let i = 0; i < res.data.length; i++) {
                                    for (let k = 0; k < res.data[i].vehicles.length; k++) {
                                        datos.push({ dueno: res.data[i].name, apellido: res.data[i].lastName, documento: res.data[i].document, placa: res.data[i].vehicles[k].plate, estado: res.data[i].vehicles[k].state })
                                    }
                                }
                                console.log(datos)
                                setData1(datos)
                                setRefreshTable(!refreshTable)
                                setIsLoading(false)

                            })
                            .catch((error) => {
                                console.error(error)
                                setData1([])
                                setIsLoading(false)

                            })
                        setModal(true)

                    }}>
                        Buscar
                    </Button>

                    <Badge className='profile-badge' color='light-primary'>
                    </Badge>

                </CardBody>

            </Card>
            <hr className='mb-2' />

            <Card className='text-center'>
                <CardBody>
                    <h3>{"Taller de Motos"}</h3>
                    <h6 className='text-muted'>{"Sobre Nosotros"}</h6>
                    <hr className='mb-2' />
                    <h5>{"Somos un taller de motos ubicados en el barrio el poblado de la ciudad de Medellín. El taller nació en el 2015 y desde entonces nuesta misió ha sido garantizar la seguridad de nuestros clientes al conducir sus vehículos, mediante el mantenimiento preventivo y correctivo que le brindamos a su vehículo, haciendo sentir a cada cliente confort y tranquilidad."}</h5>
                    <Badge className='profile-badge' color='light-primary'>
                    </Badge>

                </CardBody>

            </Card>

            <h3 className='card-profile font-weight-bolder'>Nos destacamos</h3>

            <Row>
                <Col><Card>
                    <CardImg top src={imgg1} alt='Card cap' />
                    <CardBody><CardTitle>Tiempo de entrega</CardTitle>
                        <CardText> Nos aseguramos de que todo flujo de trabajo sea el más rápido del mercado, sabemos que necesitan cuanto antes tu vehículo.
                        </CardText></CardBody>
                </Card></Col>
                <Col><Card>
                    <CardImg top src={imgg2} alt='Card cap' />
                    <CardBody><CardTitle>Calidad</CardTitle>
                        <CardText>Trabajamos con las mejores herramientas y procesos para que puedas estar tranquilo de la calida de la reparación.
                        </CardText></CardBody>
                </Card></Col>
                <Col><Card>
                    <CardImg top src={imgg3} alt='Card cap' />
                    <CardBody><CardTitle>Disponibilidad</CardTitle>
                        <CardText>Trabajamos 24 horas, 7 días a la semana. Puedes traer tu vehículo a revisión o a recogerlo en cualquier momento.
                        </CardText> </CardBody>
                </Card></Col>
            </Row>
            <hr className='mb-2' />
            <h3 className='card-profile font-weight-bolder'>Equipo de trabajo</h3>

            <Row>
                <Col>

                    <Card className='card-profile'>
                        <CardImg className='img-fluid' src={img1} top />
                        <CardBody>
                            <div className='profile-image-wrapper'>
                                <div className='profile-image'>
                                    <Avatar img={img13} />
                                </div>
                            </div>
                            <h3>Natalia</h3>
                            <h6 className='text-muted'>Fundadora</h6>
                            <h6 >Apasionada por las motos desde pequeña. Le gusta la música.</h6>
                        </CardBody>
                    </Card></Col>
                <Col>
                    <Card className='card-profile'>
                        <CardImg className='img-fluid' src={img2} top />
                        <CardBody>
                            <div className='profile-image-wrapper'>
                                <div className='profile-image'>
                                    <Avatar img={img12} />
                                </div>
                            </div>
                            <h3>Jeniffer</h3>
                            <h6 className='text-muted'>Mecánico Líder</h6>
                            <h6 >Encargado de que todo salga dentro del taller, siempre se fija en los detalles. Le gusta el Fútbol.</h6>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className='card-profile'>
                        <CardImg className='img-fluid' src={img3} top />
                        <CardBody>
                            <div className='profile-image-wrapper'>
                                <div className='profile-image'>
                                    <Avatar img={img11} />
                                </div>
                            </div>
                            <h3>Natalia</h3>
                            <h6 className='text-muted'>Mecánica</h6>
                            <h6 >Le gusta trabajar en equipo.</h6>
                        </CardBody>
                    </Card></Col>

            </Row>

            <Modal
                isOpen={modal}
                toggle={() => handleModal()}
                className=  {(data1.length > 0) ? ('modal-dialog-centered modal-xl') : ('modal-dialog-centered')}
                // modalClassName={item.modalColor}
                key="asdasd"
            >
                <ModalHeader toggle={() => handleModal()}>Vehículos Registrados</ModalHeader>
                <ModalBody>
                    { (data1.length > 0) ? (
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
                    ) : (<h6>{`No hay vehículos asociados al documento: ${text1.text1}`}</h6>)}

                </ModalBody>
                <ModalFooter>

                    <Button color='primary' onClick={() => handleModal()}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}
export default Homee
