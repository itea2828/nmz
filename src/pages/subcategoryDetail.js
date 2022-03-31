
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from 'axios';
import BASE_URL from 'utils/baseUrl';
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import Select from 'react-select';


function SubCategoryDetail() {
  
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [order, setOrder] = useState({})


    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [newImg, setNewImg] = useState(null)
    const [ordering, setOrdering] = useState()
    const [category, setCategory] = useState()



  // Orders /////// //////////////////////
  const getOrder = async () => {
    const token = localStorage.getItem("token")

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}subcategories/${params.id}/`, config)
        .then(res => {
            const o = res.data;
            console.log(`this sub cat =`, o)
            setOrder(o)
            setTitle(o.title)
            setOrdering(o.ordering)
            setCategory(o.category)
            setImage(o.image)

            setLoading(false)
            setErrors(null)
        })
    } catch (error) {
        setLoading(false)
        setOrder({})
        setErrors(error.message)
        console.log(`error data =`, error)
    }
  }

  const [categories, setCategories] = useState([])
  const [fcategories, setFcategories] = useState([])

  const getCategory = async () => {
    const token = localStorage.getItem("token")

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}categories/list/`, config)
        .then(res => {
            const o = res.data;
            console.log(`category ===`, o)
            setCategories(o)
            setFcategories(o)
            setLoading(false)
            setErrors(null)
        })
    } catch (error) {
        setLoading(false)
        setCategories([])
        setFcategories([])
        setErrors(error.message)
        console.log(`error data =`, error)
    }
  }

  useEffect(() => {
    getOrder();
    getCategory();
    // getSubCategory();
  }, [])

    const options = categories

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [findedCat, setFindedCat] = useState({})

    console.log('selectedCategory', selectedCategory)

    useEffect(() => {
        if(selectedCategory != null || selectedCategory != 'null'){
            const filtered = fcategories?.filter((i) => i.title === selectedCategory)
            setFcategories(filtered)
            
            function findCherries(category) { 
                return category.title === selectedCategory;
            }
            const result = filtered?.find(findCherries); 
            setFindedCat(result)
            // console.log('result', result)
              
        }

        if (selectedCategory === null || selectedCategory === 'null') {
            setSelectedSubCategory(null)
            setFcategories(categories)
        }
      
    }, [selectedCategory])
    
  
    // console.log('fcategories', fcategories)


    const suboptions = fcategories

    const [selectedSubCategory, setSelectedSubCategory] = useState(null);



    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        setNewImg(file)
        console.log('file', image)
    }

//   UPDATE 
  // Товары /////// //////////////////////
  const putProduct = async (e) => {
    e.preventDefault()
    try {

        let formData = new FormData();
        formData.append("user", 1);
        formData.append("title", title);
        formData.append("ordering", ordering);

        if(selectedCategory === null || selectedCategory === 'null'){
            formData.append("category", category);
        } else {
            formData.append("category", findedCat?.id);
        }
        

        const token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }

        setLoading(true)
        // console.log(`user`, user)
        const response = await axios.put(`${BASE_URL}subcategories/${params.id}/`, formData, config)
        .then(res => {
            const productUpdated = res.data;
            console.log(`productUpdated =`, productUpdated)
            
            setLoading(false)
           
            setErrors(null)
            navigate("/subcategories");
            // navigate(ADMIN_PRODUCT_LIST)
        }).catch((err) => {
            setErrors(err.message)
            console.log(`err ===`, err.message)
        })
    } catch (error) {
        setLoading(false)
        // setErrors(error)
        console.log(`error data =`, error)
    }
    
    }

    const deleteProduct = async () => {
        try {
            const token = localStorage.getItem("token")
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
    
            setLoading(true)
            // console.log(`user`, user)
            const response = await axios.delete(`${BASE_URL}subcategories/${params.id}/`, config)
            .then(res => {
                // const productUpdated = res.data;
                console.log(`product Deleted !`)
                
                setLoading(false)
               
                setErrors(null)
                navigate("/subcategories");
                // navigate(ADMIN_PRODUCT_LIST)
            }).catch((err) => {
                setErrors(err.message)
                console.log(`err ===`, err.message)
            })
        } catch (error) {
            setLoading(false)
            // setErrors(error)
            console.log(`error data =`, error)
        }
        
    }
    

    


    
    
    // console.log('categories', categories)




  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
                <SimpleBlogCard
                    image={order.image}
                    title={order.title}
                    description={'Порядок в меню - ' + order.ordering}
                    action={{
                        type: "internal",
                        route: "#",
                        color: "info",
                        label: "Airobike"
                    }}
                />
                <button style={{padding: '10px', width: '100%', backgroundColor: 'red', color: '#fff'}} onClick={() => deleteProduct()}>Удалить</button>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Form onSubmit={putProduct}>
                    
                    <Form.Group className="mb-3" controlId='title'>
                        <Form.Label>Название</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='text'
                            placeholder='Название'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='price'>
                        <Form.Label>Порядок в меню</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='number'
                            placeholder='Цена'
                            value={ordering}
                            onChange={(e) => setOrdering(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId='image'>
                        <Form.Label>Изображение категории</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='file'
                            placeholder='Изображение'
                            onChange={uploadFileHandler}
                        >
                        </Form.Control>
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId='category'>
                        <Form.Label>Категория</Form.Label>
                        <br/>
                        <Form.Select style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}} defaultValue={null} name="myParameter" 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                        >
                            <option value="null">Выбрать категорию</option>
                            {categories.map((i) => (
                                <option key={i.id} value={i.title}>{i.title}</option>
                            ))}
                        </Form.Select>

                    </Form.Group>


                    <p style={{color: 'red'}}>{errors === null ? null : <p style={{color: 'red'}}>{errors}</p> }</p>
                    <p style={{color: 'green'}}>{loading === false ? null : <p style={{color: 'green'}}>Загрузка ...</p> }</p>
                    <Button
                        style={{padding: '10px', backgroundColor: 'green', width: '100%', color: '#ffffff', borderRadius: '7px', marginTop: '30px'}}
                        type='submit' variant='primary'
                    >
                        Изменить
                    </Button>
                </Form>
            </Grid>
            
        </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default SubCategoryDetail;
