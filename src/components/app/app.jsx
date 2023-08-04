import styles from "./app.module.css";
import AppHeader from "../AppHeader/appHeader.jsx";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";
import BurgerIngredients from "../BurgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import React, { useEffect, useState } from "react";
import Api from '../../utils/Api.js';
import { apiConfig, selectedIngridientsMock, bunIdMock } from "../../utils/constants";


const webApi = new Api(apiConfig);

function App() {
    const selectedStack = selectedIngridientsMock;
    const [ingridients, setIngridients] = useState([]);
    const [selectedIngridients, setSelectedIngridients] = useState([]);
    const [bunId, setBunId] = useState();


    
    const [isLoaded, setLoaded] = useState(false);

    const [modalFormContent, setModalFormContent] = useState({
        Title: "",
        Node:null
    });

    const [isModalVisible, setModalVisibility] = useState(false);


    function getData() {
        webApi.getIngridients()
            .then(newData => {
                setIngridients(newData.data );
            })
            .catch(e => {
                console.error("Failed to load ingridients data.")
            });
    }

    function getOrder(orderDetails) {
        return webApi.createOrder(orderDetails)
            .catch(e => {
                console.error("Failed to create order.")
            });
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (ingridients.length>0)
            setLoaded(true);
    }, [ingridients])

    useEffect(() => {
        function setMock() {
            if (isLoaded)
                addSelectedIngridient(selectedStack.pop());
        }
        setMock();
    }, [isLoaded,selectedIngridients,bunId])
    
    function openModal(node, title) {
        setModalVisibility(true);
        setModalFormContent({
            Title: title,
            Node: node
        })
    }

    function closeModal(node) {
        setModalVisibility(false);
    }
    const handleOpenModal = (node, title) => openModal(node, title);
    const handleCloseModal = (node) => closeModal(node);

    function addSelectedIngridient(id) {
        const element = getIngridientById(id);
        if (!element) {
            return; }
        if (element.type === "bun") {
            setBunId(id)
        }
        else {
            const newElement = { _id: id, pos: selectedIngridients.length }
            const newCollection = [...selectedIngridients, newElement];
            setSelectedIngridients(newCollection);
        }
    }
    function ingridientExists(id) {
        return getIngridientById(id) ? true : false;
    }
    function getIngridientById(id) {
        let result;
        result = ingridients.filter((ingridient) => ingridient._id === id)[0];

        return result;
    }

    return (
        <div className={styles.app}>
            {isModalVisible && (<Modal title={modalFormContent.Title} closeFunc={handleCloseModal}>
                {modalFormContent.Node }
            </Modal>)}
            <AppHeader/>
            <main className={styles.main}>
                <div className={styles.burgerBlock}>
                    <BurgerIngredients ingridients={ingridients} handleOpenModal={handleOpenModal} />
                    <BurgerConstructor fullIngridients={ingridients} selectedIngridients={selectedIngridients} bunId={bunId}
                        handleOpenModal={handleOpenModal} createOrderFunc={(orderData) => getOrder(orderData)} />
                </div>
            </main>
            
        </div>
    );
}

export default App;
